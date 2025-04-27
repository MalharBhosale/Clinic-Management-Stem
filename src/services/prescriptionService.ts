import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Prescription, Medication } from '../types';

export const createPrescription = async (
  prescription: Omit<Prescription, 'id' | 'createdAt'>
): Promise<Prescription> => {
  try {
    const prescriptionData = {
      ...prescription,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'prescriptions'), prescriptionData);
    return { id: docRef.id, ...prescriptionData };
  } catch (error) {
    console.error('Error creating prescription:', error);
    throw error;
  }
};

export const getPrescription = async (id: string): Promise<Prescription | null> => {
  try {
    const prescriptionDoc = await getDoc(doc(db, 'prescriptions', id));
    
    if (!prescriptionDoc.exists()) {
      return null;
    }
    
    const data = prescriptionDoc.data();
    return {
      id: prescriptionDoc.id,
      patientId: data.patientId,
      doctorId: data.doctorId,
      doctorName: data.doctorName,
      diagnosis: data.diagnosis,
      medications: data.medications,
      notes: data.notes,
      createdAt: data.createdAt.toDate()
    };
  } catch (error) {
    console.error('Error getting prescription:', error);
    throw error;
  }
};

export const updatePrescription = async (
  id: string, 
  updates: Partial<Prescription>
): Promise<Prescription | null> => {
  try {
    const prescriptionRef = doc(db, 'prescriptions', id);
    await updateDoc(prescriptionRef, updates);
    return await getPrescription(id);
  } catch (error) {
    console.error('Error updating prescription:', error);
    throw error;
  }
};

export const getPatientPrescriptions = async (patientId: string): Promise<Prescription[]> => {
  try {
    const prescriptionsQuery = query(
      collection(db, 'prescriptions'),
      where('patientId', '==', patientId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(prescriptionsQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        patientId: data.patientId,
        doctorId: data.doctorId,
        doctorName: data.doctorName,
        diagnosis: data.diagnosis,
        medications: data.medications,
        notes: data.notes,
        createdAt: data.createdAt.toDate()
      };
    });
  } catch (error) {
    console.error('Error getting patient prescriptions:', error);
    throw error;
  }
};