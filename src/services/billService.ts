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
import { Bill, BillItem } from '../types';

export const createBill = async (
  bill: Omit<Bill, 'id' | 'createdAt' | 'status'> & { status?: Bill['status'] }
): Promise<Bill> => {
  try {
    const billData = {
      ...bill,
      status: bill.status || 'pending',
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'bills'), billData);
    return { id: docRef.id, ...billData };
  } catch (error) {
    console.error('Error creating bill:', error);
    throw error;
  }
};

export const getBill = async (id: string): Promise<Bill | null> => {
  try {
    const billDoc = await getDoc(doc(db, 'bills', id));
    
    if (!billDoc.exists()) {
      return null;
    }
    
    const data = billDoc.data();
    return {
      id: billDoc.id,
      patientId: data.patientId,
      patientName: data.patientName,
      tokenId: data.tokenId,
      prescriptionId: data.prescriptionId,
      items: data.items,
      totalAmount: data.totalAmount,
      status: data.status,
      createdAt: data.createdAt.toDate(),
      paidAt: data.paidAt?.toDate()
    };
  } catch (error) {
    console.error('Error getting bill:', error);
    throw error;
  }
};

export const updateBillStatus = async (
  id: string, 
  status: Bill['status']
): Promise<Bill | null> => {
  try {
    const billRef = doc(db, 'bills', id);
    const updates: Partial<Bill> = { status };
    
    if (status === 'paid') {
      updates.paidAt = new Date();
    }
    
    await updateDoc(billRef, updates);
    return await getBill(id);
  } catch (error) {
    console.error('Error updating bill status:', error);
    throw error;
  }
};

export const getPatientBills = async (patientId: string): Promise<Bill[]> => {
  try {
    const billsQuery = query(
      collection(db, 'bills'),
      where('patientId', '==', patientId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(billsQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        patientId: data.patientId,
        patientName: data.patientName,
        tokenId: data.tokenId,
        prescriptionId: data.prescriptionId,
        items: data.items,
        totalAmount: data.totalAmount,
        status: data.status,
        createdAt: data.createdAt.toDate(),
        paidAt: data.paidAt?.toDate()
      };
    });
  } catch (error) {
    console.error('Error getting patient bills:', error);
    throw error;
  }
};