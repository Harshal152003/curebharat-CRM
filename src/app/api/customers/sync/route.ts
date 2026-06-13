import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';

export async function POST() {
  try {
    await dbConnect();
    const gbmApiUrl = process.env.GBM_BACKEND_URL || 'https://gbm-cure-bharat-backend.vercel.app';
    
    // Fetch all customers from CRM to sync their KYC data
    const customers = await Customer.find({}).lean();
    let syncedCount = 0;
    
    for (const customer of customers) {
      if (!customer.memberId || customer.memberId === 'N/A') continue;
      
      try {
        const kycResponse = await fetch(`${gbmApiUrl}/api/public/kyc/policy/${customer.memberId}`);
        if (kycResponse.ok) {
          const kycJson = await kycResponse.json();
          if (kycJson.success && kycJson.data && kycJson.data.kycData) {
            const kyc = kycJson.data.kycData;
            
            // Map the data correctly to the CRM Customer model
            const updateData: any = {};
            if (kyc.gender) updateData.gender = kyc.gender;
            if (kyc.dob) updateData.dob = kyc.dob;
            
            const addressString = `${kyc.addressLine1 || ''} ${kyc.addressLine2 || ''} ${kyc.city || ''} ${kyc.state || ''} ${kyc.pincode || ''}`.trim().replace(/\s+/g, ' ');
            if (addressString) updateData.address = addressString;
            
            if (kyc.nomineeName) updateData.nomineeName = kyc.nomineeName;
            if (kyc.nomineeDOB) updateData.nomineeDob = kyc.nomineeDOB;
            if (kyc.nomineeRelation) updateData.relationship = kyc.nomineeRelation;
            
            if (Object.keys(updateData).length > 0) {
              await Customer.updateOne(
                { _id: customer._id },
                { $set: updateData }
              );
              syncedCount++;
            }
          }
        }
      } catch (err) {
        console.error(`Error syncing KYC for member ${customer.memberId}:`, err);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Successfully synced KYC data for ${syncedCount} customers.`,
      syncedCount
    });
  } catch (error: any) {
    console.error('KYC sync error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sync KYC data: ' + error.message },
      { status: 500 }
    );
  }
}
