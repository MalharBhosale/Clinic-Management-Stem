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
  Timestamp,
  limit
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Token } from '../types';

export const generateToken = async (patientId: string, patientName: string): Promise<Token> => {
  try {
    // Get the latest token number
    const tokensQuery = query(
      collection(db, 'tokens'), 
      orderBy('createdAt', 'desc'), 
      limit(1)
    );
    
    const querySnapshot = await getDocs(tokensQuery);
    let lastTokenNumber = 0;
    
    if (!querySnapshot.empty) {
      lastTokenNumber = querySnapshot.docs[0].data().number;
    }
    
    // Create a new token
    const newToken: Omit<Token, 'id'> = {
      number: lastTokenNumber + 1,
      patientId,
      patientName,
      status: 'waiting',
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'tokens'), newToken);
    return { id: docRef.id, ...newToken };
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

export const getToken = async (id: string): Promise<Token | null> => {
  try {
    const tokenDoc = await getDoc(doc(db, 'tokens', id));
    
    if (!tokenDoc.exists()) {
      return null;
    }
    
    const data = tokenDoc.data();
    return {
      id: tokenDoc.id,
      number: data.number,
      patientId: data.patientId,
      patientName: data.patientName,
      status: data.status,
      createdAt: data.createdAt.toDate(),
      completedAt: data.completedAt?.toDate()
    };
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};

export const updateTokenStatus = async (id: string, status: Token['status']): Promise<Token | null> => {
  try {
    const tokenRef = doc(db, 'tokens', id);
    const updates: Partial<Token> = { status };
    
    if (status === 'completed') {
      updates.completedAt = new Date();
    }
    
    await updateDoc(tokenRef, updates);
    return await getToken(id);
  } catch (error) {
    console.error('Error updating token status:', error);
    throw error;
  }
};

export const getTodaysTokens = async (): Promise<Token[]> => {
  try {
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tokensQuery = query(
      collection(db, 'tokens'),
      where('createdAt', '>=', today),
      orderBy('createdAt')
    );
    
    const querySnapshot = await getDocs(tokensQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        number: data.number,
        patientId: data.patientId,
        patientName: data.patientName,
        status: data.status,
        createdAt: data.createdAt.toDate(),
        completedAt: data.completedAt?.toDate()
      };
    });
  } catch (error) {
    console.error('Error getting today\'s tokens:', error);
    throw error;
  }
};

export const getWaitingTokens = async (): Promise<Token[]> => {
  try {
    const tokensQuery = query(
      collection(db, 'tokens'),
      where('status', '==', 'waiting'),
      orderBy('number')
    );
    
    const querySnapshot = await getDocs(tokensQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        number: data.number,
        patientId: data.patientId,
        patientName: data.patientName,
        status: data.status,
        createdAt: data.createdAt.toDate(),
        completedAt: data.completedAt?.toDate()
      };
    });
  } catch (error) {
    console.error('Error getting waiting tokens:', error);
    throw error;
  }
};