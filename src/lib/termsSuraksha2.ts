const logoUrl = 'https://www.curebharat.com/Logo.png';

function pageShell(
  pageNumber: number,
  sectionTitle: string,
  content: string,
  contentStyle = 'font-size: 10px; line-height: 1.56; color: #334155;'
): string {
  return `
  <div style="padding: 26px 38px 20px; min-height: 100%; display: flex; flex-direction: column; background: #fff; font-family: 'Inter', Arial, sans-serif; justify-content: space-between; box-sizing: border-box;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #D9E2EC; padding-bottom: 8px; margin-bottom: 14px;">
        <span style="font-size: 10px; font-weight: 700; color: #0B5D2A;">CureBharat Suraksha - Terms &amp; Conditions</span>
        <img src="${logoUrl}" alt="CureBharat Logo" style="height: 28px; width: auto;" />
      </div>

      ${sectionTitle ? `<div style="font-size: 14px; font-weight: 700; color: #0B5D2A; margin-bottom: 12px; text-transform: uppercase;">${sectionTitle}</div>` : ''}
      <div style="${contentStyle}">
        ${content}
      </div>
    </div>

    <div style="border-top: 1px solid #D9E2EC; padding-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 7.5px; color: #64748B; margin-top: 12px;">
      <span>CureBharat Wellness Private Limited | www.curebharat.com</span>
      <span style="font-weight: 700;">Page ${pageNumber}</span>
    </div>
  </div>
  `;
}

function blockTitle(text: string): string {
  return `<div style="font-weight: 700; color: #0B5D2A; margin-bottom: 5px;">${text}</div>`;
}

function subTitle(text: string): string {
  return `<div style="font-weight: 700; color: #1E293B; margin: 0 0 4px;">${text}</div>`;
}

function paragraph(text: string, margin = '0 0 8px'): string {
  return `<p style="margin: ${margin};">${text}</p>`;
}

function bullets(items: string[], margin = '0 0 10px 16px'): string {
  return `
    <ul style="margin: ${margin}; padding-left: 8px;">
      ${items.map((item) => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}
    </ul>
  `;
}

function glossaryColumn(items: Array<[string, string]>): string {
  return items
    .map(
      ([label, value]) =>
        `<div style="margin-bottom: 6px;"><strong>${label}:</strong> ${value}</div>`
    )
    .join('');
}

export const termsSuraksha2PagesHtml: string[] = [
  pageShell(
    1,
    'Terms & Conditions - Protection Plan (With Annexure)',
    `
    ${blockTitle('1. Premium Payment & Policy Validity')}
    ${bullets([
      'The policy is void ab initio if premium is not realized.',
      'Non-receipt of premium, cheque dishonor, or failed transaction voids cover.',
      'Coverage starts only after premium realization.',
    ])}

    ${blockTitle('2. Governing Policy Framework')}
    ${bullets([
      'Coverage is issued under the Group Master Policy held by the policyholder.',
      'Insurer standard terms, exclusions, and conditions continue to apply.',
      'If there is any inconsistency, the Master Policy and Policy Schedule prevail.',
    ])}

    ${blockTitle('3. Disclosure & Misrepresentation')}
    ${bullets([
      'Coverage is based on declarations made by the insured/member.',
      'Misstatement, non-disclosure, or fraud can lead to cancellation and claim repudiation.',
    ])}

    ${blockTitle('4. Coverage Scope Limitation')}
    ${bullets([
      'Policy wording may describe broader insurer benefits.',
      'Actual applicability remains limited to the issued COI / Schedule.',
    ])}

    ${blockTitle('5. Assignment Clause')}
    ${bullets([
      'The policy remains assigned to the Master Policyholder.',
      'Claim payouts may be made to the assignee, nominee, or legal heir as applicable.',
    ])}

    ${blockTitle('6. Free Look & Cancellation')}
    ${bullets([
      'Free look period is 15 days from issuance.',
      'Cancellation after the free look period follows the Master Policy rules.',
    ])}

    ${blockTitle('7. Instalment Premium Conditions (If Applicable)')}
    <div style="margin-left: 8px;">
      ${subTitle('7.1 Grace Period')}
      ${paragraph('A grace period of 15 days is available for premium payment.', '2px 0 6px')}
      ${subTitle('7.2 Coverage Suspension')}
      ${paragraph('No coverage is available during the unpaid period beyond the due date.', '2px 0 6px')}
      ${subTitle('7.3 Policy Lapse')}
      ${paragraph('If premium remains unpaid within the grace period, the policy may lapse and fresh waiting periods may apply.', '2px 0 6px')}
      ${subTitle('7.4 Claim Adjustment')}
      ${paragraph('Outstanding premium may be recovered or adjusted from payable claims.', '2px 0 6px')}
      ${subTitle('7.5 No Refund')}
      ${paragraph('No refund is available on instalment-based cancellation unless specifically allowed.', '2px 0 0')}
    </div>
    `
  ),
  pageShell(
    2,
    'Claims, Waiting Periods & Regulatory Terms',
    `
    ${blockTitle('8. Waiting Periods (As Per Policy Structure)')}
    ${paragraph('Based on COI data:', '0 0 5px')}
    ${bullets([
      'Initial waiting period: 0 days',
      'Critical illness waiting: Nil',
      'Pre-existing disease waiting: 0 months',
      'Specific illness waiting: 0 months',
    ])}

    ${blockTitle('9. Claims - Annexure 1 (Mandatory Section)')}
    <div style="margin-left: 8px;">
      ${subTitle('9.1 Claims Notification')}
      ${paragraph('Hospitalization claims should be intimated within 48 hours.', '2px 0 6px')}
      ${subTitle('9.2 Reimbursement Claim Process')}
      ${paragraph('Discharge documents should ordinarily be submitted within 30 days of discharge.', '2px 0 6px')}
      ${subTitle('9.3 Insurer Rights')}
      ${bullets(['Insurer may investigate claims.', 'Insurer may ask for additional supporting documents.'], '2px 0 6px 16px')}
      ${subTitle('9.4 Claim Settlement Timeline')}
      ${bullets(
        [
          'Claims are generally settled within 30 days from receipt of the last required document.',
          'Delayed settlements may attract interest as per applicable regulations.',
        ],
        '2px 0 6px 16px'
      )}
      ${subTitle('9.5 Death Claims')}
      ${bullets(['Paid to nominee or assignee.', 'Legal-heir claims may require succession proof.'], '2px 0 10px 16px')}
    </div>

    ${blockTitle('10. Documents Required for Claim')}
    ${bullets([
      'Claim form, discharge summary, hospital bills, and investigation reports',
      'Consultation papers, doctor certificate, and additional treatment records where needed',
      'Death certificate where applicable',
      'KYC and bank details with cancelled cheque for higher-value claims',
    ])}

    ${blockTitle('11. Claim Delay Condonation')}
    ${paragraph('Delay may be condoned if justified and accepted by the insurer.', '0 0 6px')}
    ${blockTitle('12. Customer Support')}
    ${paragraph('Claims and service support remain available through insurer and CureBharat channels.', '0 0 6px')}
    ${blockTitle('13. Legal & Regulatory')}
    ${bullets(['Governed by IRDAI regulations and Indian contract law.', 'Jurisdiction remains within India.'], '0 0 6px 16px')}
    ${blockTitle('14. Product Nature Disclaimer')}
    ${bullets(
      [
        'This is a group insurance benefit bundled with wellness services.',
        'Insurance applicability may be limited to the primary registered member where the plan says so.',
      ],
      '0 0 6px 16px'
    )}
    ${blockTitle('Grievance Redressal')}
    ${paragraph('Email: <strong>grievance@curebharat.com</strong>', '0')}
    `
  ),
  pageShell(
    3,
    'Website / Application Terms, Privacy & Platform Rights',
    `
    ${blockTitle('1. Introduction')}
    ${paragraph('These terms govern use of the CureBharat website and mobile application by registered users, non-registered users, beneficiaries, and healthcare service providers. They apply to telemedicine, diagnostics, doctor consultations, home care, elder care, lab tests, and related wellness services.')}
    ${paragraph('The Privacy Policy forms an integral part of these terms. Continued use of the platform means acceptance of the applicable service rules, operating conditions, and privacy practices.')}

    ${blockTitle('2. User Access Rights')}
    ${bullets([
      '<strong>Non-Registered Users:</strong> may browse public information, use the self-assessment tool, and share links.',
      '<strong>Registered Users:</strong> receive access to services and platform features communicated at onboarding.',
      '<strong>Primary Users:</strong> may manage account settings and beneficiary access where allowed.',
      '<strong>Secondary Users / Beneficiaries:</strong> may use permitted services through the primary user account.',
      '<strong>HSP Users:</strong> can access service-provider tools subject to CureBharat controls.',
    ])}

    ${blockTitle('3. Content')}
    ${bullets([
      'The platform may contain user-generated content and healthcare-provider content.',
      'CureBharat content includes proprietary or licensed material, workflows, software, trademarks, and service assets.',
    ])}

    ${blockTitle("4. General Terms of Use")}
    ${bullets([
      'You must use the platform only for lawful and intended purposes.',
      'The primary user remains responsible for activity carried out through the account by tagged users or beneficiaries.',
      'Login credentials must be kept confidential and unauthorized usage must be reported promptly.',
      'Service availability can vary by geography, provider network, capacity, and operations.',
      'You consent to service, security, transactional, and regulatory communications from CureBharat.',
    ])}

    ${blockTitle("5. CureBharat's Rights to the Application / Website and Content")}
    ${paragraph('The platform, technology stack, process design, trademarks, and service materials are protected by intellectual-property laws. Users receive only a limited, non-exclusive, non-transferable right to access and use the platform for its intended personal purpose.')}

    ${blockTitle('6. Rights in User Content')}
    ${paragraph('Users retain ownership of their submitted content but grant CureBharat the right to use, display, reproduce, adapt, and share it as reasonably needed for operating services, maintaining records, and fulfilling requested healthcare support.')}

    ${blockTitle('7. User Content and Privacy')}
    ${paragraph('CureBharat may collect Personal Information and Medical Information such as health records, prescriptions, lab reports, consultation notes, billing data, device identifiers, cookies, IP address, usage records, and communications shared during service delivery.')}
    ${paragraph('By registering or using services, you consent to collection, storage, transfer, processing, and disclosure of that information in line with these terms, the Privacy Policy, and any applicable data-collection notice.', '0')}
    `,
    'font-size: 9.9px; line-height: 1.54; color: #334155;'
  ),
  pageShell(
    4,
    'Responsibilities, Compliance, Payments & Commercial Terms',
    `
    ${blockTitle('8. Other Websites / Mobile Applications')}
    ${paragraph('The platform may contain links to third-party sites, applications, or providers for user convenience. CureBharat does not control or endorse third-party content, terms, privacy practices, availability, or service outcomes.')}

    ${blockTitle("9. CureBharat's Responsibilities")}
    ${bullets([
      'CureBharat works with available qualified HSPs after appropriate checks and onboarding processes.',
      'It uses commercially reasonable efforts to keep the platform operational, subject to downtime, outages, maintenance, network limitations, force majeure events, and service-area restrictions.',
      'CureBharat does not guarantee clinical outcomes or suitability of every service for every medical condition.',
    ])}

    ${blockTitle('10. Legal Compliance')}
    ${paragraph('CureBharat may request identity, consent, medical, or service verifications needed for lawful service delivery, regulatory compliance, fraud prevention, reimbursement validation, and provider coordination.')}

    ${blockTitle('11. Data Collection, Recording, Storage, Encryption & Usage')}
    ${bullets([
      'Information may be stored on CureBharat infrastructure, integrated software systems, or approved cloud-service providers.',
      'Collected information may be used to operate services, improve quality, personalize delivery, conduct analytics, maintain records, and send appointment, support, security, or promotional communications where allowed.',
      'Information may be disclosed or transferred when required by law, regulator direction, audit process, business restructuring, or lawful claims handling.',
    ])}

    ${blockTitle('12. User Responsibilities')}
    ${bullets([
      'Provide accurate personal and health information.',
      'Follow lawful instructions given by the treating practitioner or service provider.',
      'Do not misuse website content, reverse engineer services, upload harmful material, or interfere with platform security.',
    ])}

    ${blockTitle('13. Payment, Fees & Taxes')}
    ${paragraph('Users agree to pay all applicable service fees, convenience fees, taxes, and statutory charges. Pricing may vary by coverage, duration, quantity, provider dependency, location, and promotional offer. Services are treated as confirmed only after successful receipt of funds.')}

    ${blockTitle('General Commercial Terms')}
    ${bullets([
      'Benefits remain subject to package limits, schedule rules, verification, and operational feasibility.',
      'Some services require prior booking, pre-authorization, or provider confirmation.',
      'Where any conflict exists, the issued schedule, package details, and product brochure prevail for benefit interpretation.',
    ])}

    ${blockTitle('Other Terms')}
    ${paragraph('CureBharat may update services, application features, or terms from time to time. Indian law applies, and disputes may be resolved through arbitration in Mumbai or competent courts wherever arbitration is not applicable.', '0')}
    `,
    'font-size: 9.88px; line-height: 1.52; color: #334155;'
  ),
  pageShell(
    5,
    'Claims Reimbursement, Telemedicine & Health Plan Services',
    `
    ${blockTitle('16. Reimbursement of Claims and OPD Services in Purchased Packages')}
    ${paragraph('CureBharat may specify coverage amount, service quantity, reimbursement caps, or submission windows for OPD services within subscribed packages. Customers must follow those plan rules while availing benefits or making claims.')}
    ${bullets([
      'Claims require proof that the covered condition and service are eligible under the package and that payment was made to the relevant provider.',
      'Uncontested reimbursement claims are ordinarily processed within 7 days of submission, while cashless cases may be processed faster where no clarification is pending.',
      'Claims documents should show service dates after package purchase and within the allowed submission window.',
      'Higher-value claims may require PAN, Aadhaar, KYC, cancelled cheque, or other bank-validation documents.',
      'Readable original records are expected, and manipulated or non-genuine documents may be rejected.',
    ])}

    ${blockTitle('Documentation Guidelines by Claim Category')}
    ${bullets([
      '<strong>Medicine / Consultation:</strong> bill, prescription, provider details, and payment proof.',
      '<strong>Lab / Diagnostics:</strong> authorized report, facility details, prescribed tests, and invoice.',
      '<strong>Vision / Dental:</strong> clinically necessary treatment proof subject to package limits.',
      '<strong>Home-care / Vaccine / Ambulance:</strong> specialist prescription, service report, and emergency or provider records where applicable.',
    ])}

    ${blockTitle('1. Doctor Consultation (Telemedicine)')}
    ${paragraph('Telemedicine is available through approved communication channels for non-emergency situations. Users must provide accurate information, and practitioners may terminate or redirect a consultation if they believe physical examination or urgent medical attention is required. Teleconsultation records may be securely stored for continuity of care and compliance.')}

    ${blockTitle('2. One Circle Health Plan')}
    ${bullets([
      'The plan may combine a group insurance policy from an IRDAI-licensed insurer with wellness services facilitated by CureBharat.',
      'Benefits may include consultations, health check-ups, counseling, yoga, nutritional support, discounted diagnostics, medicines, home-care, and physical OPD visits depending on the subscribed plan.',
      'Service access depends on enrollment status, geography, provider availability, scheduling, verification, and package-specific limits.',
    ])}
    `,
    'font-size: 9.86px; line-height: 1.5; color: #334155;'
  ),
  pageShell(
    6,
    'Lab Tests, Elder Care, Dispute Terms & Glossary',
    `
    ${blockTitle('3. Lab Test Services')}
    ${bullets([
      'Users may book tests for facility visit or home sample collection where available.',
      'Booking details, order IDs, and service instructions may be communicated by email, SMS, WhatsApp, or platform notifications.',
      'Users must comply with pre-test instructions and provide required identification at collection or service delivery.',
      'Reports may be shared digitally or physically, and turnaround time varies by service category and provider process.',
      'Bookings may be modified or cancelled subject to provider policy, operational cut-off timelines, and applicable cancellation charges.',
    ])}

    ${blockTitle('4. Elder Care')}
    ${paragraph('Elder-care services may include health monitoring, support visits, emergency coordination, connected devices, and caregiver support depending on the subscribed package. Misuse of devices, support channels, or emergency-response services may lead to service restriction or suspension.')}

    ${blockTitle('Confidentiality, Liability & Termination')}
    ${bullets([
      'CureBharat keeps user information confidential except where disclosure is needed for service delivery, legal compliance, fraud prevention, investigation, or enforcement of rights.',
      'To the extent permitted by law, CureBharat disclaims indirect or consequential liability arising from misuse of the platform, third-party provider acts, or user violation of law or policy.',
      'Users agree to indemnify CureBharat for losses caused by unlawful use, rights violation, fraud, or misuse attributable to the user.',
      'Accounts or services may be suspended or terminated for breach, fraud, non-payment, regulatory direction, or other legal necessity.',
    ])}

    ${blockTitle('Glossary')}
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 9.3px; line-height: 1.5;">
      <div>${glossaryColumn([
        ['Application / Website', 'CureBharat web and mobile experience through which services are made available'],
        ['Doctor', 'general practitioners and specialists recognized to practice medicine in India'],
        ['General Practitioner', 'doctor with MBBS qualification licensed in India'],
        ['HSPs', 'clinicians, hospitals, labs, home-care professionals, and related partners'],
        ['Network Provider', 'listed physician, clinic, hospital, or diagnostic center'],
        ['Primary User', 'registered user who can manage account access and beneficiary linkage'],
      ])}</div>
      <div>${glossaryColumn([
        ['Personal Information', 'identifiable information voluntarily or operationally shared by the user'],
        ['Platform', 'the CureBharat website or mobile application'],
        ['Services', 'telemedicine, diagnostics, wellness, lab, elder-care, and related support services'],
        ['Teleconsultation', 'remote audio, video, or chat-based medical consultation'],
        ['Wellness Services', 'consultations, diagnostics, coaching, counseling, and home-care support'],
        ['Home Care', 'supportive or healthcare care delivered at home by a qualified caregiver or professional'],
      ])}</div>
    </div>

    ${blockTitle('Grievance Redressal Mechanism')}
    ${paragraph(
      'For complaints, privacy questions, or unresolved service concerns, contact <strong>grievance@curebharat.com</strong> or write to CureBharat Wellness Private Limited, 6th Floor, Lightbridge, Hiranandani Business Park, Andheri East, Mumbai 400072.',
      '10px 0 0'
    )}
    `,
    'font-size: 9.84px; line-height: 1.5; color: #334155;'
  ),
];
