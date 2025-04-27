import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Patient } from '../types';

export const addPatient = async (patient: Omit<Patient, 'id' | 'createdAt'>) => {
  try {
    const patientData = {
      ...patient,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'patients'), patientData);
    return { id: docRef.id, ...patientData };
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const getPatient = async (id: string): Promise<Patient | null> => {
  try {
    const patientDoc = await getDoc(doc(db, 'patients', id));
    
    if (!patientDoc.exists()) {
      return null;
    }
    
    const data = patientDoc.data();
    return {
      id: patientDoc.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      age: data.age,
      gender: data.gender,
      address: data.address,
      medicalHistory: data.medicalHistory,
      createdAt: data.createdAt.toDate(),
      lastVisit: data.lastVisit?.toDate()
    };
  } catch (error) {
    console.error('Error getting patient:', error);
    throw error;
  }
};

export const updatePatient = async (id: string, updates: Partial<Patient>) => {
  try {
    const patientRef = doc(db, 'patients', id);
    await updateDoc(patientRef, {
      ...updates,
      lastVisit: updates.lastVisit || new Date()
    });
    
    // Get the updated patient
    return await getPatient(id);
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

export const getAllPatients = async (): Promise<Patient[]> => {
  try {
    const patientsQuery = query(collection(db, 'patients'), orderBy('name'));
    const querySnapshot = await getDocs(patientsQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: data.age,
        gender: data.gender,
        address: data.address,
        medicalHistory: data.medicalHistory,
        createdAt: data.createdAt.toDate(),
        lastVisit: data.lastVisit?.toDate()
      };
    });
  } catch (error) {
    console.error('Error getting all patients:', error);
    throw error;
  }
};

export const searchPatients = async (searchTerm: string): Promise<Patient[]> => {
  try {
    // Get all patients (in a real app, this would be more optimized with proper indexing)
    const patients = await getAllPatients();
    
    // Filter patients based on the search term
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  } catch (error) {
    console.error('Error searching patients:', error);
    throw error;
  }
};