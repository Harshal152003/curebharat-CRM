import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Template from '@/models/Template';
import { v4 as uuid } from 'uuid';
import { ITemplatePage, IComponent } from '@/types';

export async function POST() {
  try {
    await dbConnect();

    const existing = await Template.findOne({
      name: 'CureBharat Premium Wellness'
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Template already seeded',
        data: existing
      });
    }

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

    const createText = (
      content: string,
      style: Record<string, unknown> = {},
      position: any = { type: 'flow' }
    ): IComponent => ({
      id: uuid(),
      type: 'text',
      props: { content },
      style,
      position
    });

    const createSpacer = (height: string): IComponent => ({
      id: uuid(),
      type: 'spacer',
      props: { height },
      style: {},
      position: { type: 'flow' }
    });

    const createTable = (
      headers: string[],
      rows: string[][],
      headerBg: string = brandColors.primary,
      headerColor: string = '#ffffff'
    ): IComponent => ({
      id: uuid(),
      type: 'table',
      props: {
        headers,
        rows,
        headerBg,
        headerColor
      },
      style: {
        margin: '24px 0',
        border: '2px solid #0B5D2A',
        borderCollapse: 'collapse',
        fontSize: '13px'
      },
      position: { type: 'flow' }
    });

    // =========================
    // COVER PAGE
    // =========================

    const coverPage: ITemplatePage = {
      pageIndex: 0,
      pageType: 'cover',
      title: 'Cover Page',

      background: {
        type: 'color',
        value: '#ffffff',
        opacity: 1,
        overlay: ''
      },

      showGlobalHeader: false,
      showGlobalFooter: false,
      showGlobalWatermark: false,

      sections: [
        {
          id: uuid(),
          layout: 'full',

          style: {
            padding: '60px 50px',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          },

          components: [
            createText(`
              <div style="text-align:center; margin-top:80px;">

                <div style="
                  width:160px;
                  height:160px;
                  border:3px dashed #D1D5DB;
                  margin:0 auto 50px;
                  border-radius:20px;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  color:#94A3B8;
                  font-size:18px;
                  font-weight:600;
                ">
                  LOGO
                </div>

                <div style="
                  font-size:64px;
                  font-weight:800;
                  color:#F07A1F;
                  line-height:1;
                ">
                  CureBharat
                </div>

                <div style="
                  font-size:64px;
                  font-weight:800;
                  color:#0B5D2A;
                  margin-top:12px;
                  line-height:1;
                ">
                  Suraksha Special
                </div>

                <div style="
                  width:220px;
                  height:5px;
                  background:#F07A1F;
                  margin:40px auto 0;
                  border-radius:50px;
                "></div>

                <div style="
                  margin-top:100px;
                  font-size:24px;
                  color:#334155;
                  font-weight:500;
                ">
                  Redefining Wellness for Bharat
                </div>

              </div>
            `),

            createText(`
              <div style="
                position:absolute;
                bottom:0;
                left:0;
                width:100%;
                height:100px;
                background:linear-gradient(90deg,#F07A1F 0%, #0B5D2A 100%);
                border-top-left-radius:160px;
              "></div>
            `)
          ]
        }
      ]
    };

    // =========================
    // WELCOME PAGE
    // =========================

    const welcomePage: ITemplatePage = {
      pageIndex: 1,
      pageType: 'welcome',
      title: 'Welcome Letter',

      background: {
        type: 'color',
        value: '#ffffff',
        opacity: 1,
        overlay: ''
      },

      showGlobalHeader: true,
      showGlobalFooter: true,
      showGlobalWatermark: false,

      header: {
        enabled: true,
        height: '70px',
        companyName: 'CureBharat Wellness',
        backgroundColor: '#ffffff',
        textColor: '#0B5D2A'
      },

      footer: {
        enabled: true,
        height: '70px',
        showPageNumbers: true,
        companyDetails:
          'CureBharat Wellness Private Limited | www.curebharat.com',
        backgroundColor: '#ffffff',
        textColor: '#334155'
      },

      sections: [
        {
          id: uuid(),
          layout: 'full',

          style: {
            padding: '40px',
            position: 'relative'
          },

          components: [
            createText(`
              <div style="max-width:620px;">

                <div style="
                  font-size:24px;
                  color:#1E293B;
                  margin-bottom:10px;
                ">
                  Welcome to
                </div>

                <div style="
                  font-size:54px;
                  font-weight:700;
                  color:#0B5D2A;
                  line-height:1.1;
                  margin-bottom:30px;
                ">
                  CureBharat Family
                </div>

                <div style="
                  width:180px;
                  height:4px;
                  background:#F07A1F;
                  margin-bottom:30px;
                "></div>

                <div style="
                  font-size:15px;
                  line-height:1.9;
                  color:#334155;
                ">
                  Dear Valued Member,
                  <br/><br/>

                  Congratulations and a warm welcome to CureBharat.
                  We are delighted to have you with us on this journey
                  towards a healthier and secure future.

                  <br/><br/>

                  At CureBharat Wellness Private Limited, our purpose is to make
                  healthcare accessible, affordable and continuous
                  for every Indian family.

                  <br/><br/>

                  Through preventive healthcare, digital innovation and
                  protection benefits, we are committed to supporting
                  you and your loved ones at every stage of life.

                </div>

              </div>
            `),

            createText(`
              <div style="
                display:grid;
                grid-template-columns:repeat(4,1fr);
                gap:18px;
                margin-top:70px;
              ">

                <div style="
                  border:1px solid #E2E8F0;
                  border-radius:16px;
                  padding:18px;
                  text-align:center;
                ">
                  <div style="
                    font-size:18px;
                    font-weight:700;
                    color:#0B5D2A;
                  ">
                    PREVENTIVE HEALTHCARE
                  </div>

                  <div style="
                    font-size:12px;
                    color:#64748B;
                    margin-top:8px;
                    line-height:1.6;
                  ">
                    Focus on prevention and long-term wellness.
                  </div>
                </div>

                <div style="
                  border:1px solid #E2E8F0;
                  border-radius:16px;
                  padding:18px;
                  text-align:center;
                ">
                  <div style="
                    font-size:18px;
                    font-weight:700;
                    color:#F07A1F;
                  ">
                    FAMILY CENTRIC CARE
                  </div>

                  <div style="
                    font-size:12px;
                    color:#64748B;
                    margin-top:8px;
                    line-height:1.6;
                  ">
                    Solutions designed for your loved ones.
                  </div>
                </div>

                <div style="
                  border:1px solid #E2E8F0;
                  border-radius:16px;
                  padding:18px;
                  text-align:center;
                ">
                  <div style="
                    font-size:18px;
                    font-weight:700;
                    color:#0B5D2A;
                  ">
                    DIGITAL HEALTH
                  </div>

                  <div style="
                    font-size:12px;
                    color:#64748B;
                    margin-top:8px;
                    line-height:1.6;
                  ">
                    AI-powered monitoring and wellness tools.
                  </div>
                </div>

                <div style="
                  border:1px solid #E2E8F0;
                  border-radius:16px;
                  padding:18px;
                  text-align:center;
                ">
                  <div style="
                    font-size:18px;
                    font-weight:700;
                    color:#F07A1F;
                  ">
                    TRUSTED SUPPORT
                  </div>

                  <div style="
                    font-size:12px;
                    color:#64748B;
                    margin-top:8px;
                    line-height:1.6;
                  ">
                    We stay with you at every step.
                  </div>
                </div>

              </div>
            `),

            createSpacer('40px'),

            createText(`
              <div style="
                border:1px solid #DDE5DD;
                border-radius:12px;
                padding:25px;
                text-align:center;
                background:#F8FAF7;
              ">
                <div style="
                  font-size:24px;
                  color:#0B5D2A;
                  font-weight:600;
                  line-height:1.8;
                ">
                  Our mission is to empower every Indian family with
                  accessible, affordable and continuous healthcare support.
                </div>
              </div>
            `)
          ]
        }
      ]
    };

    // =========================
    // CERTIFICATE PAGE
    // =========================

    const certificatePage: ITemplatePage = {
      pageIndex: 2,
      pageType: 'certificate',
      title: 'Certificate',

      background: {
        type: 'color',
        value: '#ffffff',
        opacity: 1,
        overlay: ''
      },

      showGlobalHeader: false,
      showGlobalFooter: true,
      showGlobalWatermark: false,

      footer: {
        enabled: true,
        height: '70px',
        showPageNumbers: true,
        companyDetails:
          'CureBharat Wellness Private Limited | www.curebharat.com',
        backgroundColor: '#ffffff',
        textColor: '#334155'
      },

      sections: [
        {
          id: uuid(),
          layout: 'full',

          style: {
            padding: '25px',
            border: '4px solid #0B5D2A',
            margin: '20px',
            borderRadius: '20px'
          },

          components: [
            createText(`
              <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:40px;
              ">

                <div style="
                  width:180px;
                  height:120px;
                  border:2px dashed #CBD5E1;
                  border-radius:14px;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  color:#94A3B8;
                  font-weight:600;
                ">
                  LOGO
                </div>

                <div style="
                  text-align:right;
                  font-size:14px;
                  color:#334155;
                  line-height:1.8;
                ">
                  6th Floor, Lightbridge,<br/>
                  Hiranandani Business Park,<br/>
                  Andheri East, Mumbai - 400072<br/><br/>
                  www.curebharat.com
                </div>

              </div>
            `),

            createText(`
              <div style="
                text-align:center;
                font-size:52px;
                font-weight:800;
                color:#0B5D2A;
                letter-spacing:2px;
                margin-bottom:10px;
              ">
                CERTIFICATE OF COVERAGE
              </div>
            `),

            createText(`
              <div style="
                width:250px;
                height:5px;
                background:#F07A1F;
                margin:20px auto 50px;
                border-radius:50px;
              "></div>
            `),

            // MEMBER DETAILS

            createText(`
              <div style="
                border:2px solid #2F6B3C;
                border-radius:18px;
                overflow:hidden;
                margin-top:30px;
              ">

                <div style="
                  background:#0B5D2A;
                  color:white;
                  padding:12px 20px;
                  font-size:22px;
                  font-weight:700;
                ">
                  MEMBER DETAILS
                </div>

                <div style="
                  padding:28px;
                  display:grid;
                  grid-template-columns:1fr 1fr;
                  gap:24px 40px;
                ">

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Member Name
                    </div>

                    <div style="
                      font-size:20px;
                      font-weight:700;
                      color:#1E293B;
                      margin-top:6px;
                    ">
                      {{member_name}}
                    </div>
                  </div>

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Contact Number
                    </div>

                    <div style="
                      font-size:18px;
                      font-weight:600;
                      color:#1E293B;
                      margin-top:6px;
                    ">
                      {{phone}}
                    </div>
                  </div>

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Member ID
                    </div>

                    <div style="
                      font-size:20px;
                      font-weight:700;
                      color:#0B5D2A;
                      margin-top:6px;
                    ">
                      {{member_id}}
                    </div>
                  </div>

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Address
                    </div>

                    <div style="
                      font-size:15px;
                      font-weight:500;
                      color:#334155;
                      margin-top:6px;
                      line-height:1.7;
                    ">
                      {{address}}
                    </div>
                  </div>

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Date of Birth
                    </div>

                    <div style="
                      font-size:18px;
                      font-weight:600;
                      color:#1E293B;
                      margin-top:6px;
                    ">
                      {{dob}}
                    </div>
                  </div>

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Nominee Name
                    </div>

                    <div style="
                      font-size:18px;
                      font-weight:600;
                      color:#1E293B;
                      margin-top:6px;
                    ">
                      {{nominee_name}}
                    </div>
                  </div>

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Gender
                    </div>

                    <div style="
                      font-size:18px;
                      font-weight:600;
                      color:#1E293B;
                      margin-top:6px;
                    ">
                      {{gender}}
                    </div>
                  </div>

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Nominee Relationship
                    </div>

                    <div style="
                      font-size:18px;
                      font-weight:600;
                      color:#1E293B;
                      margin-top:6px;
                    ">
                      {{relationship}}
                    </div>
                  </div>

                </div>

              </div>
            `),

            // COVERAGE DETAILS

            createText(`
              <div style="
                border:2px solid #2F6B3C;
                border-radius:18px;
                overflow:hidden;
                margin-top:28px;
              ">

                <div style="
                  background:#0B5D2A;
                  color:white;
                  padding:12px 20px;
                  font-size:22px;
                  font-weight:700;
                ">
                  COVERAGE DETAILS
                </div>

                <div style="
                  padding:28px;
                  display:grid;
                  grid-template-columns:1fr 1fr;
                  gap:24px 40px;
                ">

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Coverage Start Date
                    </div>

                    <div style="
                      font-size:18px;
                      font-weight:600;
                      color:#1E293B;
                      margin-top:6px;
                    ">
                      {{plan_start}}
                    </div>
                  </div>

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Plan Subscription Price
                    </div>

                    <div style="
                      font-size:20px;
                      font-weight:700;
                      color:#0B5D2A;
                      margin-top:6px;
                    ">
                      ₹ {{plan_price}}
                    </div>
                  </div>

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Coverage End Date
                    </div>

                    <div style="
                      font-size:18px;
                      font-weight:600;
                      color:#1E293B;
                      margin-top:6px;
                    ">
                      {{plan_end}}
                    </div>
                  </div>

                  <div>
                    <div style="font-size:12px;color:#64748B;text-transform:uppercase;">
                      Members Covered
                    </div>

                    <div style="
                      font-size:18px;
                      font-weight:600;
                      color:#1E293B;
                      margin-top:6px;
                    ">
                      {{members_covered}}
                    </div>
                  </div>

                </div>

              </div>
            `)
          ]
        }
      ]
    };

    // =========================
    // BENEFITS PAGE
    // =========================

    const benefitsPage: ITemplatePage = {
      pageIndex: 3,
      pageType: 'benefits',
      title: 'Benefits',

      background: {
        type: 'color',
        value: '#ffffff',
        opacity: 1,
        overlay: ''
      },

      showGlobalHeader: true,
      showGlobalFooter: true,
      showGlobalWatermark: false,

      footer: {
        enabled: true,
        height: '70px',
        showPageNumbers: true,
        companyDetails:
          'CureBharat Wellness Private Limited | www.curebharat.com',
        backgroundColor: '#ffffff',
        textColor: '#334155'
      },

      sections: [
        {
          id: uuid(),
          layout: 'full',

          style: {
            padding: '40px'
          },

          components: [
            createText(`
              <div style="
                font-size:34px;
                font-weight:700;
                color:#0B5D2A;
                margin-bottom:10px;
              ">
                WELLNESS PLAN BENEFITS
              </div>
            `),

            createText(`
              <div style="
                width:180px;
                height:4px;
                background:#F07A1F;
                margin-bottom:30px;
              "></div>
            `),

            createTable(
              ['Benefits', 'CureBharat Suraksha Special'],
              [
                ['Member Details', 'Self + Spouse + 2 Children'],
                ['Duration', '1 Year'],
                ['GP Teleconsultations', 'Doctor on Call / GP Teleconsultation - Unlimited'],
                ['Annual Health Check-up', 'AHC (83 Parameters) - 1'],
                ['OPD Health Benefits', 'Up to ₹750'],
                ['Medicine Reimbursement', 'Up to ₹750'],
                ['Diagnostic Benefits', 'Up to ₹750'],
                ['Vitals Tracking', 'BP, Heart Rate, BMI, Weight, Step Counts'],
                ['Diagnostic Discount', 'Up to 20%'],
                ['Medicine Discount', 'Up to 20%'],
                ['Lab Discount', 'Up to 50%']
              ]
            )
          ]
        }
      ]
    };

    // =========================
    // TERMS PAGE
    // =========================

    const termsPage: ITemplatePage = {
      pageIndex: 4,
      pageType: 'terms',
      title: 'Terms & Conditions',

      background: {
        type: 'color',
        value: '#ffffff',
        opacity: 1,
        overlay: ''
      },

      showGlobalHeader: true,
      showGlobalFooter: true,
      showGlobalWatermark: false,

      footer: {
        enabled: true,
        height: '70px',
        showPageNumbers: true,
        companyDetails:
          'CureBharat Wellness Private Limited | www.curebharat.com',
        backgroundColor: '#ffffff',
        textColor: '#334155'
      },

      sections: [
        {
          id: uuid(),
          layout: 'full',

          style: {
            padding: '40px'
          },

          components: [
            createText(`
              <div style="
                font-size:36px;
                font-weight:700;
                color:#0B5D2A;
                margin-bottom:20px;
              ">
                Terms & Conditions
              </div>
            `),

            createText(`
              <div style="
                font-size:12px;
                line-height:2;
                color:#475569;
                text-align:justify;
              ">
                This membership certificate is issued under CureBharat Wellness
                Private Limited and is subject to all applicable terms,
                conditions, exclusions and policy guidelines.

                <br/><br/>

                Coverage is applicable only during the validity period mentioned
                in the certificate of coverage.

                <br/><br/>

                All claims, reimbursements and wellness benefits are subject to
                internal approval policies and supporting documentation.

                <br/><br/>

                CureBharat reserves the right to revise provider networks,
                wellness benefits and operational policies as required.

                <br/><br/>

                By using this membership, the member agrees to all terms
                and conditions associated with the wellness and protection plan.
              </div>
            `)
          ]
        }
      ]
    };

    // =========================
    // CREATE TEMPLATE
    // =========================

    const newTemplate = await Template.create({
      name: 'CureBharat Premium Wellness',

      description:
        'Professional brochure style healthcare membership template',

      category: 'wellness',

      pageCount: 5,

      brandColors,

      createdBy: 'admin',

      pages: [
        coverPage,
        welcomePage,
        certificatePage,
        benefitsPage,
        termsPage
      ],

      isActive: true
    });

    return NextResponse.json({
      success: true,
      message: 'Professional brochure template seeded successfully',
      data: newTemplate
    });

  } catch (error) {
    console.error('Seed error:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          'Failed to seed template: ' +
          (error instanceof Error
            ? error.message
            : 'Unknown error')
      },
      { status: 500 }
    );
  }
}