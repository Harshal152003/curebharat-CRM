import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  try {
    await dbConnect();

    const existing = await User.findOne({ email: 'admin@curebharat.com' });
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Admin user already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword('admin123');

    const user = await User.create({
      email: 'admin@curebharat.com',
      password: hashedPassword,
      name: 'CureBharat Admin',
      role: 'superadmin',
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed admin user' },
      { status: 500 }
    );
  }
}
