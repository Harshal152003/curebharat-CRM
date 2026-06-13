import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Template from '@/models/Template';
import { v4 as uuid } from 'uuid';
import { ITemplatePage } from '@/types';
import { termsSampoornaPremiumPagesHtml } from '@/lib/termsSampoornaPremium';

export async function POST() {
  try {
    await dbConnect();

    // Remove existing CureBharat Sampoorna Suraksha Premium template for clean re-seed
    await Template.deleteMany({ name: 'CureBharat Sampoorna Suraksha Premium' });

    const brandColors = {
      primary: '#0B5D2A',
      secondary: '#F07A1F',
      accent: '#FFD16A',
      border: '#2F6B3C',
      background: '#FFFFFF',
      softBackground: '#F8FAF7',
      text: '#1E293B',
      muted: '#64748B'
    };

    // Icons SVGs
    const icons = {
      shield: `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`,
      users: `<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
      location: `<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
      email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
      globe: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
      user: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
      phone: `<svg viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>`,
      calendar: `<svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>`,
      rupee: `<svg viewBox="0 0 24 24"><path d="M13.66 7c-.51-1.34-1.63-2.33-3.16-2.66V3h-2v1.34c-1.2.26-2.1.8-2.62 1.66h2.24c.26-.4.76-.73 1.38-.73 1.1 0 1.83.6 1.83 1.45 0 .96-.8 1.45-1.83 1.45H8.25C6.46 8.17 5.5 9.42 5.5 10.82c0 1.34.88 2.37 2.5 2.68V15h2v-1.5c1.4-.3 2.36-.93 2.82-1.8h-2.38c-.3.45-.84.8-1.44.8-1.23 0-2.02-.63-2.02-1.55 0-1.02.9-1.55 2.02-1.55h1.25c1.79 0 2.75-1.25 2.75-2.65 0-.58-.18-1.12-.52-1.55z"/></svg>`
    };

    // Page 0: Cover Page
    const page0Html = `
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #fdfdfd; overflow: hidden; z-index: 10;">
        <!-- Background Image (Family) -->
        <div style="position: absolute; top: 0; right: 0; width: 70%; height: 100%; z-index: 1;">
          <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" style="width: 100%; height: 100%; object-fit: cover; object-position: right top;" />
        </div>
        
        <!-- White Gradient Overlay on left to blend text -->
        <div style="position: absolute; top: 0; left: 0; width: 80%; height: 100%; background: linear-gradient(to right, rgba(253,253,253,1) 45%, rgba(253,253,253,0.8) 60%, rgba(253,253,253,0) 100%); z-index: 2;"></div>

        <!-- Wave Overlay at Bottom -->
        <div style="position: absolute; bottom: 50px; left: 0; right: 0; height: 150px; z-index: 3;">
           <svg viewBox="0 0 1000 100" preserveAspectRatio="none" style="width: 100%; height: 100%;">
             <path d="M0,100 L0,50 C300,100 500,0 1000,60 L1000,100 Z" fill="#F07A1F" />
             <path d="M150,100 C400,100 700,20 1000,80 L1000,100 Z" fill="#0B5D2A" />
           </svg>
         </div>

        <!-- Banner -->
        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 50px; background: rgba(0,0,0,0.6); z-index: 4; display: flex; align-items: center; justify-content: center;">
          <div style="color: white; font-size: 22px; font-weight: 600; letter-spacing: 1px;">Redefining Wellness for Bharat</div>
        </div>

        <!-- Text Content Layer -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 5; display: flex; flex-direction: column; padding: 60px;">
          <!-- Logo -->
          <div style="margin-bottom: 250px;">
            <img src="https://res.cloudinary.com/dn65pq1ej/image/upload/v1780915274/Logo_kjqrdc.png" alt="CureBharat Logo" style="height: 100px; object-fit: contain;" />
          </div>

          <!-- Title -->
          <div style="max-width: 500px;">
            <div style="color: #F07A1F; font-family: 'Inter', sans-serif; font-size: 64px; font-weight: 800; line-height: 1.1; margin-bottom: 10px;">CureBharat</div>
            <div style="color: #0B5D2A; font-family: 'Inter', sans-serif; font-size: 44px; font-weight: 800; line-height: 1.2; margin-bottom: 25px; text-transform: uppercase;">Sampoorna Suraksha Premium</div>
            <div style="height: 5px; width: 120px; background: linear-gradient(to right, #F07A1F, rgba(240,122,31,0)); border-radius: 2px;"></div>
          </div>
        </div>
      </div>
    `;

    // Page 1: Welcome Page
    const page1Html = `
      <div style="padding: 40px 50px; height: 100%; display: flex; flex-direction: column; background: #fff;">
        <!-- Header -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
          <img src="https://res.cloudinary.com/dn65pq1ej/image/upload/v1780915274/Logo_kjqrdc.png" alt="CureBharat Logo" style="height: 90px; object-fit: contain;" />
        </div>

        <!-- Welcome Text -->
        <div style="margin-bottom: 25px;">
          <div style="color: #333; font-size: 24px; font-weight: 400; margin-bottom: 5px;">Welcome to</div>
          <div style="color: #0B5D2A; font-size: 42px; font-weight: 700; font-family: 'Playfair Display', serif; margin-bottom: 10px;">CureBharat Family</div>
          <div style="width: 60px; height: 3px; background: #F07A1F;"></div>
        </div>

        <div style="color: #0B5D2A; font-weight: 700; font-size: 14px; margin-bottom: 15px;">Dear Valued Member,</div>
        
        <div style="color: #333; font-size: 12.5px; line-height: 1.6; margin-bottom: 15px;">
          Congratulations and a warm welcome to CureBharat.
        </div>
        <div style="color: #333; font-size: 12.5px; line-height: 1.6; margin-bottom: 15px;">
          We are delighted to have you with us on this journey towards a healthier, happier and more secure future.
        </div>
        <div style="color: #333; font-size: 12.5px; line-height: 1.6; margin-bottom: 15px;">
          At CureBharat Wellness Private Limited, our purpose is to make quality healthcare <span style="color: #0B5D2A; font-weight: 700;">accessible, affordable</span> and <span style="color: #0B5D2A; font-weight: 700;">continuous</span> for every Indian family.
        </div>
        <div style="color: #333; font-size: 12.5px; line-height: 1.6; margin-bottom: 15px;">
          Through a powerful blend of preventive healthcare, digital innovation and protection benefits, we are committed to supporting you and your loved ones at every stage of life.
        </div>
        <div style="color: #333; font-size: 12.5px; line-height: 1.6; margin-bottom: 15px;">
          Your trust inspires us to innovate, improve and deliver excellence every single day.
        </div>
        <div style="color: #0B5D2A; font-size: 12.5px; font-weight: 700; margin-bottom: 5px;">
          Thank you for choosing CureBharat.
        </div>
        <div style="color: #333; font-size: 12.5px; margin-bottom: 30px;">
          We look forward to being your lifelong partner in health and wellness.
        </div>

        <!-- 4 Feature Cards -->
        <div style="display: flex; gap: 15px; margin-bottom: 30px; margin-top: auto;">
          <div style="flex: 1; text-align: center;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: #E8F5E9; border: 1px solid #C8E6C9; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
               <div style="width: 24px; height: 24px; fill: #0B5D2A;">${icons.shield}</div>
            </div>
            <div style="color: #0B5D2A; font-weight: 700; font-size: 11px; margin-bottom: 5px;">PREVENTIVE<br/>HEALTHCARE</div>
            <div style="color: #666; font-size: 10px; line-height: 1.4;">Focus on prevention<br/>and long-term wellness.</div>
          </div>
          <div style="flex: 1; text-align: center;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: #FFF3E0; border: 1px solid #FFE0B2; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
               <div style="width: 24px; height: 24px; fill: #F07A1F;">${icons.users}</div>
            </div>
            <div style="color: #F07A1F; font-weight: 700; font-size: 11px; margin-bottom: 5px;">FAMILY-CENTRIC<br/>CARE</div>
            <div style="color: #666; font-size: 10px; line-height: 1.4;">Solutions designed for<br/>you and your loved ones.</div>
          </div>
          <div style="flex: 1; text-align: center;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: #E8F5E9; border: 1px solid #C8E6C9; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
               <div style="width: 24px; height: 24px; fill: #0B5D2A;">
                 <svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-5-2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.5-9.5h-5V6h5v1.5z"/></svg>
               </div>
            </div>
            <div style="color: #0B5D2A; font-weight: 700; font-size: 11px; margin-bottom: 5px;">DIGITAL HEALTH<br/>& MONITORING</div>
            <div style="color: #666; font-size: 10px; line-height: 1.4;">AI-driven tools for<br/>smarter health insights.</div>
          </div>
          <div style="flex: 1; text-align: center;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: #FFF3E0; border: 1px solid #FFE0B2; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
               <div style="width: 24px; height: 24px; fill: #F07A1F;">
                 <svg viewBox="0 0 24 24"><path d="M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm4-5.5V10c0-1.66-1.34-3-3-3S9 8.34 9 10v1.5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM12 9c.55 0 1 .45 1 1v1.5h-2V10c0-.55.45-1 1-1zm6 4c0-1.1-.9-2-2-2h-1V10c0-2.76-2.24-5-5-5S5 7.24 5 10v1h-1c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6z"/></svg>
               </div>
            </div>
            <div style="color: #F07A1F; font-weight: 700; font-size: 11px; margin-bottom: 5px;">TRUSTED<br/>SUPPORT</div>
            <div style="color: #666; font-size: 10px; line-height: 1.4;">We are with you,<br/>every step of the way.</div>
          </div>
        </div>

        <!-- Mission Statement -->
        <div style="background: #F8FBF8; border: 1px solid #E2E8E2; border-radius: 8px; padding: 15px; text-align: center; margin-bottom: 30px; position: relative;">
          <span style="color: #0B5D2A; font-size: 24px; font-family: serif; position: absolute; left: 15px; top: 5px;">&ldquo;</span>
          <div style="color: #0B5D2A; font-size: 14px; font-weight: 600; padding: 0 25px;">
            Our mission is to empower every Indian family with<br/>accessible, affordable and continuous healthcare support.
          </div>
          <span style="color: #0B5D2A; font-size: 24px; font-family: serif; position: absolute; right: 15px; bottom: 5px; line-height: 0;">&rdquo;</span>
        </div>

        <!-- Signature -->
        <div style="margin-bottom: 20px;">
          <div style="color: #333; font-size: 12px; margin-bottom: 5px;">Warm Regards,</div>
          <!-- Fake signature -->
          <div style="font-family: 'Playfair Display', cursive; font-size: 28px; color: #333; margin-bottom: -5px; line-height: 1; transform: rotate(-5deg); margin-left: 10px;">Tarun S</div>
          <div style="width: 120px; height: 1px; background: #333; margin-bottom: 5px;"></div>
          <div style="color: #333; font-weight: 700; font-size: 12px;">Tarun Sengar</div>
          <div style="color: #666; font-size: 10px;">Chief Executive Officer (CEO)<br/>CureBharat Wellness Private Limited</div>
        </div>

        <!-- Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #E2E8F0; padding-top: 15px;">
          <div style="display: flex; gap: 10px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: #0B5D2A; display: flex; align-items: center; justify-content: center; fill: white;">
              ${icons.location}
            </div>
            <div style="color: #333; font-size: 9px; line-height: 1.3;">
              <span style="font-weight: 700;">Registered Office:</span><br/>
              6th Floor, Lightbridge,<br/>
              Hiranandani Business Park,<br/>
              Andheri East, Mumbai - 400072
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 16px; height: 16px; border-radius: 50%; background: #0B5D2A; display: flex; align-items: center; justify-content: center; fill: white; padding: 3px;">
                ${icons.email}
              </div>
              <span style="color: #333; font-size: 10px;">contactus@curebharat.com</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 16px; height: 16px; border-radius: 50%; background: #0B5D2A; display: flex; align-items: center; justify-content: center; fill: white; padding: 3px;">
                ${icons.globe}
              </div>
              <span style="color: #333; font-size: 10px;">www.curebharat.com</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Page 2: Certificate of Coverage
    const page2Html = `
      <div style="padding: 20px; height: 100%; display: flex; flex-direction: column; background: #fff; position: relative;">
        <!-- Outer Border -->
        <div style="position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 2.5px solid #0B5D2A; border-radius: 12px; pointer-events: none; z-index: 10;"></div>
        <!-- Inner Border -->
        <div style="position: absolute; top: 22px; left: 22px; right: 22px; bottom: 22px; border: 1px solid #0B5D2A; border-radius: 8px; pointer-events: none; z-index: 10;"></div>
        
        <!-- Corner decorations -->
        <div style="position: absolute; top: 12px; left: 12px; width: 30px; height: 30px; background: white; z-index: 11;">
          <svg width="30" height="30" viewBox="0 0 30 30"><path d="M30,2.5 Q2.5,2.5 2.5,30" fill="none" stroke="#0B5D2A" stroke-width="2.5"/></svg>
        </div>
        <div style="position: absolute; top: 12px; right: 12px; width: 30px; height: 30px; background: white; z-index: 11;">
          <svg width="30" height="30" viewBox="0 0 30 30"><path d="M0,2.5 Q27.5,2.5 27.5,30" fill="none" stroke="#0B5D2A" stroke-width="2.5"/></svg>
        </div>
        
        <!-- Bottom Wave -->
        <div style="position: absolute; bottom: 16px; left: 16px; right: 16px; height: 100px; overflow: hidden; border-radius: 0 0 10px 10px; z-index: 1;">
           <svg viewBox="0 0 1000 100" preserveAspectRatio="none" style="width: 100%; height: 100%;">
             <path d="M-100,100 L-100,60 C200,120 400,0 1100,70 L1100,100 Z" fill="#F07A1F" />
             <path d="M200,100 C400,100 600,20 1100,50 L1100,100 Z" fill="#0B5D2A" />
           </svg>
         </div>

        <div style="position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; padding: 25px 35px;">
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <!-- Logo from URL -->
            <div style="flex: 1; display: flex; justify-content: center; padding-right: 15px;">
              <img src="https://res.cloudinary.com/dn65pq1ej/image/upload/v1780915274/Logo_kjqrdc.png" alt="CureBharat Logo" style="height: 110px; object-fit: contain;" />
            </div>

            <!-- Divider -->
            <div style="width: 1.5px; height: 70px; background: #0B5D2A; opacity: 0.8;"></div>

            <!-- Address -->
            <div style="flex: 1; display: flex; flex-direction: column; gap: 12px; padding-left: 25px;">
              <div style="display: flex; gap: 10px;">
                <div style="width: 20px; height: 20px; min-width: 20px; border-radius: 50%; background: #0B5D2A; display: flex; align-items: center; justify-content: center; fill: white; padding: 4px;">
                  ${icons.location}
                </div>
                <div style="color: #333; font-size: 11px; line-height: 1.6;">
                  6th Floor, Lightbridge,<br/>
                  Hiranandani Business Park,<br/>
                  Andheri East,<br/>
                  Mumbai – 400072
                </div>
              </div>
              <div style="display: flex; gap: 10px; align-items: center;">
                <div style="width: 20px; height: 20px; min-width: 20px; border-radius: 50%; background: #0B5D2A; display: flex; align-items: center; justify-content: center; fill: white; padding: 4px;">
                  ${icons.globe}
                </div>
                <div style="color: #333; font-size: 11px; font-weight: 500;">www.curebharat.com</div>
              </div>
            </div>
          </div>

          <!-- Title -->
          <div style="text-align: center; margin-bottom: 25px;">
            <div style="color: #0B5D2A; font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 800; letter-spacing: 1px;">CERTIFICATE OF COVERAGE</div>
            <div style="display: flex; align-items: center; justify-content: center; margin-top: 10px;">
              <div style="height: 1.5px; width: 140px; background: #F07A1F;"></div>
              <div style="margin: 0 10px; color: #F07A1F; display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C12 2 15 8 22 12C15 16 12 22 12 22C12 22 9 16 2 12C9 8 12 2 12 2Z"/>
                </svg>
              </div>
              <div style="height: 1.5px; width: 140px; background: #F07A1F;"></div>
            </div>
          </div>

          <!-- Certify Text -->
          <div style="text-align: center; color: #333; font-size: 13px; font-weight: 500; line-height: 1.6; margin-bottom: 35px; padding: 0 40px;">
            This is to certify that the individual mentioned below is covered<br/>
            under CureBharat Wellness Private Limited for the services as detailed herein.
          </div>

          <!-- MEMBER DETAILS -->
          <div style="border: 1.5px solid #0B5D2A; border-radius: 12px; margin-bottom: 30px; position: relative; padding-top: 20px; background: white; z-index: 5;">
            <!-- Section Header -->
            <div style="position: absolute; top: -20px; left: -10px; display: flex; align-items: center;">
              <div style="width: 40px; height: 40px; background: #0B5D2A; border-radius: 50%; display: flex; align-items: center; justify-content: center; fill: white; z-index: 2; border: 2.5px solid white; box-sizing: border-box; padding: 6px;">
                ${icons.user}
              </div>
              <div style="background: #0B5D2A; color: white; padding: 6px 15px 6px 25px; margin-left: -20px; border-radius: 0 20px 20px 0; font-weight: 700; font-size: 12px; z-index: 1; letter-spacing: 0.5px;">
                MEMBER DETAILS
              </div>
            </div>

            <div style="display: flex; padding: 20px; padding-bottom: 25px; gap: 15px;">
              <div style="flex: 1; display: flex; flex-direction: column; gap: 18px; min-width: 0;">
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.user}</div>
                  <div class="cb-lbl" style="width: 110px; min-width: 110px;">Member Name</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word;">{{member_name}}</div>
                </div>
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.user}</div>
                  <div class="cb-lbl" style="width: 110px; min-width: 110px;">Member ID</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word;">{{member_id}}</div>
                </div>
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.calendar}</div>
                  <div class="cb-lbl" style="width: 110px; min-width: 110px;">Date of Birth</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word;">{{dob}}</div>
                </div>
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.users}</div>
                  <div class="cb-lbl" style="width: 110px; min-width: 110px;">Gender</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word;">{{gender}}</div>
                </div>
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.email}</div>
                  <div class="cb-lbl" style="width: 110px; min-width: 110px;">Email ID</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; min-width: 0; word-break: break-all; overflow-wrap: anywhere;">{{email}}</div>
                </div>
                <div class="cb-field" style="margin-top: 15px;">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.location}</div>
                  <div class="cb-lbl" style="width: 110px; min-width: 110px;">Address</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word; font-weight: 700; font-size: 11.5px; line-height: 1.4;">{{address}}</div>
                </div>
              </div>
              
              <div style="border-left: 1.5px dotted rgba(11,93,42,0.5); margin: 0 10px;"></div>

              <div style="flex: 1; display: flex; flex-direction: column; gap: 18px; min-width: 0;">
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.phone}</div>
                  <div class="cb-lbl" style="width: 120px;">Contact Number</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word;">{{phone}}</div>
                </div>
                
                <div class="cb-field" style="margin-top: 15px;">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.user}</div>
                  <div class="cb-lbl" style="width: 120px;">Nominee Name</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word;">{{nominee_name}}</div>
                </div>
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.calendar}</div>
                  <div class="cb-lbl" style="width: 120px;">Nominee DOB</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word;">{{nominee_dob}}</div>
                </div>
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.users}</div>
                  <div class="cb-lbl" style="width: 120px;">Nominee Gender</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word;">{{nominee_gender}}</div>
                </div>
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.users}</div>
                  <div class="cb-lbl" style="width: 120px;">Nominee Relationship</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word;">{{relationship}}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- COVERAGE DETAILS -->
          <div style="border: 1.5px solid #0B5D2A; border-radius: 12px; position: relative; padding-top: 20px; background: white; z-index: 5;">
            <!-- Section Header -->
            <div style="position: absolute; top: -20px; left: -10px; display: flex; align-items: center;">
              <div style="width: 40px; height: 40px; background: #0B5D2A; border-radius: 50%; display: flex; align-items: center; justify-content: center; fill: white; z-index: 2; border: 2.5px solid white; box-sizing: border-box; padding: 6px;">
                ${icons.shield}
              </div>
              <div style="background: #0B5D2A; color: white; padding: 6px 15px 6px 25px; margin-left: -20px; border-radius: 0 20px 20px 0; font-weight: 700; font-size: 12px; z-index: 1; letter-spacing: 0.5px;">
                COVERAGE DETAILS
              </div>
            </div>

            <div style="display: flex; padding: 20px; padding-bottom: 25px; gap: 15px;">
              <div style="flex: 1; display: flex; flex-direction: column; gap: 18px; min-width: 0;">
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.calendar}</div>
                  <div class="cb-lbl" style="width: 145px; min-width: 145px; max-width: 145px; white-space: nowrap;">Coverage Start Date</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word; white-space: nowrap;">{{plan_start}}</div>
                </div>
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.calendar}</div>
                  <div class="cb-lbl" style="width: 145px; min-width: 145px; max-width: 145px; white-space: nowrap;">Coverage End Date</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word; white-space: nowrap;">{{plan_end}}</div>
                </div>
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.shield}</div>
                  <div class="cb-lbl" style="width: 120px; min-width: 120px; max-width: 120px; white-space: nowrap;">Plan Name/ Type</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word; white-space: nowrap;">{{plan_name}}</div>
                </div>
              </div>

              <div style="border-left: 1.5px dotted rgba(11,93,42,0.5); margin: 0 10px;"></div>

              <div style="flex: 1; display: flex; flex-direction: column; gap: 18px; min-width: 0;">
                <div class="cb-field">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.rupee}</div>
                  <div class="cb-lbl" style="width: 120px; line-height: 1.3;">Plan Subscription Price<br/><span style="font-size: 9px; font-weight: 400;">(With GST)</span></div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word;">{{plan_price}}</div>
                </div>
                <div class="cb-field" style="margin-top: 10px;">
                  <div class="cb-icon" style="background: #0B5D2A; fill: white; border-radius: 50%; padding: 4px; box-sizing: border-box; width: 22px; height: 22px;">${icons.users}</div>
                  <div class="cb-lbl" style="width: 120px; min-width: 120px; max-width: 120px; white-space: nowrap;">Members Covered</div>
                  <div class="cb-sep">:</div>
                  <div class="cb-val" style="flex: 1; word-wrap: break-word; white-space: nowrap;">{{members_covered}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Page 3: Wellness Plan Benefits (Premium version)
    const page3Html = `
      <div style="padding: 40px; height: 100%; display: flex; flex-direction: column; background: #fff;">
        <!-- Header -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
          <div style="width: 150px; height: 150px; display: flex; justify-content: center; align-items: center; margin-bottom: 5px;">
            <img src="https://res.cloudinary.com/dn65pq1ej/image/upload/v1780915274/Logo_kjqrdc.png" alt="CureBharat Logo" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
          </div>
        </div>

        <div style="text-align: center; font-size: 14px; font-weight: 700; text-decoration: underline; margin-bottom: 20px; text-transform: uppercase;">
          WELLNESS PLAN- {{plan_name}}
        </div>
        <div style="text-align: center; font-size: 12px; font-weight: 600; text-decoration: underline; margin-bottom: 30px;">
          Wellness Benefits in the Plan-
        </div>

        <table style="width: 100%; border-collapse: collapse; border: 2px solid #000; font-size: 11px;">
          <thead>
            <tr style="background: #007399; color: white;">
              <th style="border: 2px solid #000; padding: 8px; text-align: left; width: 35%;">Benefits</th>
              <th style="border: 2px solid #000; padding: 8px; text-align: center;">CureBharat Sampoorna Suraksha Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Member Details</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: 700;">Self + Spouse + 2 Children + 2 Parents</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Duration</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: 700;">1 Year</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">GP Teleconsultations</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;">Doctor on Call / GP Teleconsultation - Unlimited</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Specialist Teleconsultations</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;">Specialist Teleconsultations - 6</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Nutritionist Teleconsultations</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;">Coaching based Nutritionist (Virtual Health Coach) - 4</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Annual Health Check- up<br/>(Home collection)</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;">AHC (83 Parameters) - 2</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;" rowspan="4">OPD Health Benefits</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: 700;">Multi-Purpose Cashless / Reimbursement Benefit -<br/>₹7,000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="text-align: left;">Specialist and GP Consultation<br/>Cashless / Reimbursement<br/>Benefit</span>
                  <span style="font-weight: 700; border-left: 1px solid #000; padding-left: 10px; display: flex; align-items: center; width: 80px; justify-content: center;">up to<br/>₹7,000</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="text-align: left; display: flex; align-items: center;">Medicine Reimbursement<br/>Benefit</span>
                  <span style="font-weight: 700; border-left: 1px solid #000; padding-left: 10px; display: flex; align-items: center; width: 80px; justify-content: center;">up to<br/>₹7,000</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="text-align: left;">Lab, Imaging, Scan Cashless /<br/>Reimbursement Benefit</span>
                  <span style="font-weight: 700; border-left: 1px solid #000; padding-left: 10px; display: flex; align-items: center; width: 80px; justify-content: center;">up to<br/>₹7,000</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">OPD Health Benefit Sub-Limits</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;"><span style="font-weight: 700;">₹750</span> Per claim, 1 claim(s) per month per category</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Vitals Tracking</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: center;">AI Based Face Scan 27 Vital Check through Website, Visit- www.curebharat.com</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Discount Features</td>
              <td style="border: 1px solid #000; padding: 8px; text-align: left;">
                Diagnostic Test discount - up to 20%<br/>
                Medicine discount - up to 20% Labs discount - up to 50% GP<br/>
                consultation - up to 30%<br/>
                Speciality consultation - up to 20%
              </td>
            </tr>
            <tr style="background: #007399; height: 20px;">
              <td style="border: 2px solid #000;" colspan="2"></td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 40px; font-size: 11px; color: #333; line-height: 1.5;">
          Registered Address- CureBharat Wellness Private Limited, 6th Floor, Hiranandani<br/>
          Business Park, LightBridge, Andheri East Mumbai-400072
        </div>
      </div>
    `;

    // Page 4: Protection Plan Benefits (Premium version)
    const page4Html = `
      <div style="padding: 40px; height: 100%; display: flex; flex-direction: column; background: #fff;">
        <!-- Header -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
          <div style="width: 150px; height: 150px; display: flex; justify-content: center; align-items: center; margin-bottom: 5px;">
            <img src="https://res.cloudinary.com/dn65pq1ej/image/upload/v1780915274/Logo_kjqrdc.png" alt="CureBharat Logo" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
          </div>
        </div>

        <div style="text-align: center; font-size: 14px; font-weight: 700; text-decoration: underline; margin-bottom: 30px;">
          Protection Plan Benefits-
        </div>

        <table style="width: 100%; border-collapse: collapse; border: 2px solid #000; font-size: 11px;">
          <thead>
            <tr style="background: #007399; color: white;">
              <th style="border: 2px solid #000; padding: 8px; text-align: left; width: 50%;">Protection Benefit (Age 18-65 Year)</th>
              <th style="border: 2px solid #000; padding: 8px; text-align: left;">For Primary Member Only (1 Person)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Accidental Death benefit</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">1000000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Permanent Partial Disability and Permanent total<br/>Disability</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Up to 1000000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 50px; vertical-align: top;">Accidental Hospitalisation</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">Up to 75000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">Children Education Benefit- Up to 2 Children in case of<br/>Accidental Death and PTD</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700;">50000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 40px; vertical-align: top;">Ambulance Cover</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">2000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 40px; vertical-align: top;">Burn</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">10000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 50px; vertical-align: top;">Fracture</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">10000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 60px; vertical-align: top;">Life Style Modification</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">5000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; height: 80px; vertical-align: middle;">Hospi Cash Benefit 1000 Per day for 30 Days in a Policy<br/>Year, (*24 Hours hospitalisation = 1 Day)</td>
              <td style="border: 1px solid #000; padding: 8px; font-weight: 700; vertical-align: top;">30000</td>
            </tr>
            <tr style="background: #007399; height: 20px;">
              <td style="border: 2px solid #000;" colspan="2"></td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 80px; font-size: 8px; color: #666; line-height: 1.5;">
          *Protection Plan is only for the Primary Member age 18-65 Years in Good Health<br/>
          ** Refer Terms & Conditions for coverage, claim and policy details
        </div>

        <div style="margin-top: 40px; font-size: 11px; color: #333; line-height: 1.5;">
          Registered Address- CureBharat Wellness Private Limited, 6th Floor, Hiranandani<br/>
          Business Park, LightBridge, Andheri East Mumbai-400072
        </div>
      </div>
    `;

    // Helper to wrap pages into mongoose-friendly object structure
    const createRawHtmlPage = (pageIndex: number, pageType: 'cover' | 'welcome' | 'certificate' | 'benefits' | 'terms', title: string, htmlContent: string): ITemplatePage => ({
      pageIndex,
      pageType,
      title,
      background: { type: 'color', value: '#ffffff', opacity: 1, overlay: '' },
      showGlobalHeader: false,
      showGlobalFooter: false,
      showGlobalWatermark: false,
      sections: [
        {
          id: uuid(),
          layout: 'full',
          style: { padding: '0', height: '100%' },
          components: [
            {
              id: uuid(),
              type: 'text',
              props: { content: htmlContent },
              style: { height: '100%' },
              position: { type: 'flow' }
            }
          ]
        }
      ]
    });

    const pages = [
      createRawHtmlPage(0, 'cover', 'Cover Page', page0Html),
      createRawHtmlPage(1, 'welcome', 'Welcome Letter', page1Html),
      createRawHtmlPage(2, 'certificate', 'Certificate of Coverage', page2Html),
      createRawHtmlPage(3, 'benefits', 'Wellness Plan Benefits', page3Html),
      createRawHtmlPage(4, 'benefits', 'Protection Plan Benefits', page4Html),
      ...termsSampoornaPremiumPagesHtml.map((htmlContent, index) => 
        createRawHtmlPage((5 + index), 'terms', `Terms & Conditions - Page ${index + 1}`, htmlContent)
      )
    ];

    const newTemplate = await Template.create({
      name: 'CureBharat Sampoorna Suraksha Premium',
      description: 'Professional brochure style healthcare membership template with complete terms and conditions matching the Sampoorna Suraksha Premium layout',
      category: 'wellness',
      pageCount: pages.length,
      brandColors,
      createdBy: 'admin',
      pages,
      isActive: true
    });

    return NextResponse.json({
      success: true,
      message: `Professional brochure template with ${pages.length} pages seeded successfully`,
      data: {
        id: newTemplate._id,
        name: newTemplate.name,
        pageCount: newTemplate.pageCount
      }
    });

  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to seed template: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}
