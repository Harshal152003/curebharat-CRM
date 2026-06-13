
const logoUrl = 'https://res.cloudinary.com/dukua47wj/image/upload/v1781334213/6b4c8003-8aef-4cb4-a656-256a84618bae.png';

function pageShell(
  pageNumber: number,
  content: string,
) {
  return `
  <div style="padding: 40px 45px; height: 100%; display: flex; flex-direction: column; background: #fff; font-family: 'Inter', Arial, sans-serif; box-sizing: border-box;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0B5D2A; padding-bottom: 15px; margin-bottom: 25px; flex-shrink: 0;">
      <span style="font-size: 15px; font-weight: 800; color: #0B5D2A; text-transform: uppercase; letter-spacing: 0.5px;">CureBharat Sampoorna Suraksha Plus - Terms &amp; Conditions</span>
      <img src="${logoUrl}" alt="CureBharat Logo" style="height: 38px; width: auto;" />
    </div>

    <div style="flex-grow: 1; font-size: 11px; line-height: 1.6; color: #334155;">
      ${content}
    </div>

    <div style="border-top: 1.5px solid #cbd5e1; padding-top: 15px; display: flex; justify-content: space-between; align-items: center; font-size: 9px; color: #64748B; margin-top: 25px; flex-shrink: 0;">
      <span style="font-weight: 500;">CureBharat Wellness Private Limited | www.curebharat.com</span>
      <span style="font-weight: 700; color: #0B5D2A;">Page ${pageNumber}</span>
    </div>
  </div>
  `;
}

export const termsSampoornaPlusPagesHtml: string[] = [
  pageShell(1, `
<div style="margin-bottom: 8px; font-weight: 500;">TERMS &amp; CONDITIONS – PROTECTION PLAN (WITH ANNEXURE)</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">1. Premium Payment &amp; Policy Validity</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">The policy shall be void ab initio in case of:</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Non-receipt of premium</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Dishonour of cheque / failed transaction</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Coverage becomes effective only after premium realization</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">2. Governing Policy Framework</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">This cover is issued under:</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Group Master Policy held by Policyholder</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Insurer standard terms, exclusions, and conditions</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">In case of dispute:</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; color: #475569;"><strong>&rarr;</strong> Master Policy + Policy Schedule shall prevail</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">3. Disclosure &amp; Misrepresentation</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Policy is issued based on information provided by the insured/member</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Any:</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Misstatement</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Non-disclosure</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Fraudulent declaration</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; color: #475569;"><strong>&rarr;</strong> Shall result in policy cancellation and claim repudiation</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">4. Coverage Scope Limitation</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Policy wording includes all standard benefits of insurer</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">However, coverage applicable will be restricted to COI / Schedule only</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">5. Assignment Clause</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Policy is assigned to Master Policyholder</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">All claim payouts shall be made to:</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; color: #475569;"><strong>&rarr;</strong> Assignee / Nominee / Legal heir, as applicable</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">6. Free Look &amp; Cancellation</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Free Look Period: 15 days from issuance</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Cancellation post Free Look:</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; color: #475569;"><strong>&rarr;</strong> Governed by Master Policy terms</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">7. Instalment Premium Conditions (If Applicable)</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">7.1 Grace Period</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">15 days allowed for premium payment</span></div>
`), 
  pageShell(2, `
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">7.2 Coverage Suspension</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">No coverage during unpaid period post due date</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">7.3 Policy Lapse</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Policy cancels if premium not received within grace period</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Fresh policy will have new waiting periods</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">7.4 Claim Adjustment</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Outstanding premium will be:</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Deducted from claim OR</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Recovered before claim settlement</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">7.5 No Refund</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">No refund in instalment-based policies upon cancellation</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">8. WAITING PERIODS (As per Policy Structure)</div>
<div style="margin-bottom: 8px; font-weight: 500;">Based on COI data:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Initial Waiting Period → 0 days</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Critical Illness Waiting → Nil</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Pre-existing Disease → 0 months</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Specific Illness → 0 months</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">9. CLAIMS – ANNEXURE 1 (MANDATORY SECTION)</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">9.1 Claims Notification</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Must be informed within 48 hours of hospitalization</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">9.2 Reimbursement Claim Process</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Documents to be submitted within 30 days of discharge</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">9.3 Insurer Rights</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Insurer may:</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Investigate claim</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Request additional documents</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">9.4 Claim Settlement Timeline</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Claims settled within 30 days of last document submission</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Delay beyond 30 days:</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; color: #475569;"><strong>&rarr;</strong> Interest payable at 2% above bank rate</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">9.5 Death Claims</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Paid to:</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Nominee / Assignee</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Legal heir (with succession proof)</span></div>
`), 
  pageShell(3, `
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">10. DOCUMENTS REQUIRED FOR CLAIM</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Claim Form</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Discharge Summary</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Hospital Bills</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Investigation Reports</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Consultation Papers</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Doctor Certificate</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Death Certificate (if applicable)</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">KYC (if claim &gt; ₹1 lakh)</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Bank details with cancelled cheque</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">11. CLAIM DELAY CONDONATION</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Delay in claim intimation may be condoned:</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; color: #475569;"><strong>&rarr;</strong> If justified and accepted by insurer</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">12. CUSTOMER SUPPORT</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Claims / Service:</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; color: #475569;"><strong>&rarr;</strong> Insurer Call Centre (24x7)</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">13. LEGAL &amp; REGULATORY</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Governed by:</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">IRDAI regulations</span></div>
<div style="margin-left: 28px; margin-bottom: 4px; display: flex;"><span style="margin-right: 8px;">○</span><span style="flex:1;">Indian Contract Law</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Jurisdiction:</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; color: #475569;"><strong>&rarr;</strong> Courts in India</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">14. PRODUCT NATURE DISCLAIMER</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">This is a group insurance benefit bundled with wellness services</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Insurance is applicable:</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; color: #475569;"><strong>&rarr;</strong> Only to Primary Registered Member</div>
<div style="margin-bottom: 8px; font-weight: 500;">TERMS &amp; CONDITIONS – WELLNESS PLAN</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">1. INTRODUCTION:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Welcome to the website and mobile application ("Application") of CureBharat Wellness Private Limited ("CureBharat "</div>
<div style="margin-bottom: 8px; font-weight: 500;">or ," "We," "Our," or "Us").</div>
<div style="margin-bottom: 8px; font-weight: 500;">The terms "You," "Your," or "User" refer to individuals accessing or using the Application or Website, regardless of</div>
<div style="margin-bottom: 8px; font-weight: 500;">whether you are a Registered User, a Health Service Provider (HSP) Registered User, or a Non-Registered User. If the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Application or Website is accessed by a third party from your device or user ID (with or without your consent), these</div>
<div style="margin-bottom: 8px; font-weight: 500;">terms shall also apply to that individual.</div>
<div style="margin-bottom: 8px; font-weight: 500;">These Terms and Conditions outline the manner in which CureBharat  provides its services, including but not limited</div>
<div style="margin-bottom: 8px; font-weight: 500;">to Telemedicine Consultations, Diagnostic Lab Tests, Doctor Consultations, Dietary Guidance, and Wellness Services</div>
`), 
  pageShell(4, `
<div style="margin-bottom: 8px; font-weight: 500;">(collectively referred to as the "Services"), as well as CureBharat 's responsibilities and liabilities and your obligations</div>
<div style="margin-bottom: 8px; font-weight: 500;">as a User. The Privacy Policy forms an integral part of these Terms and Conditions; therefore, we strongly encourage</div>
<div style="margin-bottom: 8px; font-weight: 500;">you to review it to understand how CureBharat  protects and uses the Personal Data and Medical Information</div>
<div style="margin-bottom: 8px; font-weight: 500;">("Personal Information") you share.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Personal Data refers to any information that identifies you or is associated with you, such as financial or health data.</div>
<div style="margin-bottom: 8px; font-weight: 500;">The details of the Personal Data processed are listed in Annexure I. Medical Information includes health-related</div>
<div style="margin-bottom: 8px; font-weight: 500;">records like prescriptions, lab reports, doctors' notes, telemedicine recordings, billing, inventory, and relevant health</div>
<div style="margin-bottom: 8px; font-weight: 500;">history exchanged with Healthcare Practitioners via the CureBharat Site.</div>
<div style="margin-bottom: 8px; font-weight: 500;">By using our Services, you agree to these Terms and Conditions. If you do not accept them, please stop using the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Application or Website. If any inconsistency arises, the specific terms for the Service will take precedence over general</div>
<div style="margin-bottom: 8px; font-weight: 500;">terms. Definitions can be found in the Glossary.</div>
<div style="margin-bottom: 8px; font-weight: 500;">These Terms and Conditions cover:</div>
<div style="margin-bottom: 8px; font-weight: 500;">A. Website/Application Terms of Use;</div>
<div style="margin-bottom: 8px; font-weight: 500;">B. Service Terms and Conditions for:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Doctor Consultation,</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">One Circle Health Plan,</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Home Care,</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Lab Test,</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Elder Care.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">A. WEBSITE / APPLICATION TERMS OF USE:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Please review these terms carefully. By continuing to use this website or app, you confirm your acceptance of our</div>
<div style="margin-bottom: 8px; font-weight: 500;">The Terms of Use, Privacy Policy, any additional Service-specific terms, other applicable policies, and disclaimers</div>
<div style="margin-bottom: 8px; font-weight: 500;">together form the "Agreement" governing your access and use of the Application/Website and Services. Any</div>
<div style="margin-bottom: 8px; font-weight: 500;">modifications to the Agreement will be enforceable, and this Agreement supersedes all previous terms.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">1. Application / Website:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  operates the website (www.CureBharat .com) and mobile app (CureBharat  ), which users may use to</div>
<div style="margin-bottom: 8px; font-weight: 500;">access services and manage both personal and non-personal information.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">2. User Access Rights:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. Non-Registered Users may only browse, use the Self-Assessment Tool, and share links via social media.</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. HSP Registered Users can access services at specified clinics or hospitals, subject to agreements and</div>
<div style="margin-bottom: 8px; font-weight: 500;">communicated restrictions.</div>
<div style="margin-bottom: 8px; font-weight: 500;">c. Registered Users have all rights of Non-Registered Users, plus access to additional services as outlined in</div>
<div style="margin-bottom: 8px; font-weight: 500;">agreements or communicated upon registration.</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. Primary Users are adults with legal capacity who control account features and may grant access to others.</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. Secondary Users are usually minors or those lacking consent capacity, who may be granted access by a Primary</div>
<div style="margin-bottom: 8px; font-weight: 500;">User.</div>
<div style="margin-bottom: 8px; font-weight: 500;">This refers to the dependent of a Primary User who has been designated as such and accesses and uses the services</div>
<div style="margin-bottom: 8px; font-weight: 500;">on the Application/Website at the request and discretion of the Primary User.</div>
`), 
  pageShell(5, `
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">3. Content:</div>
<div style="margin-bottom: 8px; font-weight: 500;">The data and information available on the Application/Website may be classified as:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. Data and information created or provided by Unregistered Users, SP Registered Users, and Registered Users on</div>
<div style="margin-bottom: 8px; font-weight: 500;">the Application/Website ("User Content").</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. Data and information generated or procured by CureBharat  (including its contractors) for the Application/Website,</div>
<div style="margin-bottom: 8px; font-weight: 500;">which also includes content from HSP ("CureBharat  Content").</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  receives the following types of data and information from its Services:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. Personal Information necessary for using the Application/Website but not specific to any Service provided.</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. Service-specific Personal Information offered by users while availing a Service.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">4. General Terms of Use:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. As mandated by law, you must be at least 18 years old, of sound mind, and not prohibited under any law from</div>
<div style="margin-bottom: 8px; font-weight: 500;">entering into a contract to access and use the Application/Website and Services as a Primary User. If a minor (less</div>
<div style="margin-bottom: 8px; font-weight: 500;">than 18 years old) needs to access or use the Application/Website or Services, only their legal</div>
<div style="margin-bottom: 8px; font-weight: 500;">guardian/representative should register as the Primary User and create/add the minor's profile as a Secondary User.</div>
<div style="margin-bottom: 8px; font-weight: 500;">For minors, access will be as a Secondary User with limited rights granted by CureBharat .</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. All Services are requested and provided to the Primary User. A Secondary User may benefit from Services given to</div>
<div style="margin-bottom: 8px; font-weight: 500;">the Primary User but only as a beneficiary. The Primary User remains fully responsible and accountable for the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Secondary User’s activity on the Application/Website, as if they were accessing and using it directly. However, this</div>
<div style="margin-bottom: 8px; font-weight: 500;">does not absolve an adult and mentally competent Secondary User from liability towards CureBharat , its</div>
<div style="margin-bottom: 8px; font-weight: 500;">contractors, or agents. CureBharat  may proceed against both the Secondary User and Primary User jointly or</div>
<div style="margin-bottom: 8px; font-weight: 500;">separately for any violations caused by the Secondary User.</div>
<div style="margin-bottom: 8px; font-weight: 500;">c. You must not share your login details with anyone. You are responsible for keeping your account access</div>
<div style="margin-bottom: 8px; font-weight: 500;">information and password confidential and are liable for all usage of your account and password, whether</div>
<div style="margin-bottom: 8px; font-weight: 500;">authorized or not. Immediately notify CureBharat  of any unauthorized use of your account or password. CureBharat</div>
<div style="margin-bottom: 8px; font-weight: 500;">is not responsible for your losses or damages resulting from unauthorized use, but you could be liable for losses or</div>
<div style="margin-bottom: 8px; font-weight: 500;">damages to CureBharat  or others due to such misuse.</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. You shall use the Application/Website and its features strictly in accordance with applicable Indian laws and only</div>
<div style="margin-bottom: 8px; font-weight: 500;">for purposes intended under this Agreement.</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. Limit your use of the Application/Website to India only. We are not responsible if you access Services from outside</div>
<div style="margin-bottom: 8px; font-weight: 500;">India; advice or prescriptions from HSPs must be validated by a registered local medical practitioner.</div>
<div style="margin-bottom: 8px; font-weight: 500;">f. Some Services are location-specific and may not be available depending on where you are.</div>
<div style="margin-bottom: 8px; font-weight: 500;">g. You must not intentionally use the Application/Website in any unlawful manner or harm CureBharat , its directors,</div>
<div style="margin-bottom: 8px; font-weight: 500;">employees, affiliates, distributors, partners, service providers, users, or any data/content on the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Application/Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">User Consent &amp; Privacy:**</div>
<div style="margin-bottom: 8px; font-weight: 500;">h. You must not use the Application/Website for any illegal, immoral, or offensive purpose, or any other purpose that</div>
<div style="margin-bottom: 8px; font-weight: 500;">violates laws or regulations.</div>
`), 
  pageShell(6, `
<div style="margin-bottom: 8px; font-weight: 500;">i. Do not interfere with, disrupt, or hinder the proper functioning of the Application/Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">j. You understand that during registration and use, you may receive communications from CureBharat  through your</div>
<div style="margin-bottom: 8px; font-weight: 500;">registered contact information regarding registration, Services, transactions, or other relevant information.</div>
<div style="margin-bottom: 8px; font-weight: 500;">k. Notwithstanding any contrary provisions, you confirm that you are not barred from receiving Services under</div>
<div style="margin-bottom: 8px; font-weight: 500;">applicable Indian laws.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  will send communications only to the contact details you provide. It is your responsibility to ensure you</div>
<div style="margin-bottom: 8px; font-weight: 500;">submit correct contact information for each transaction. CureBharat  may also provide notifications and reminders for</div>
<div style="margin-bottom: 8px; font-weight: 500;">features you use on the Application/Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">By accepting these Terms of Use, you consent to CureBharat  collecting your Medical Information from HSP.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  may also share the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Dynamic password/OTP may be shared with you to enable secure online delivery of your medical information. You</div>
<div style="margin-bottom: 8px; font-weight: 500;">hereby consent to receive such communications from CureBharat .</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">5. CureBharat 's Rights to the Application / Website and CureBharat  Content:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  acknowledges and respects the intellectual property rights of others, and expects reciprocal conduct from</div>
<div style="margin-bottom: 8px; font-weight: 500;">users. The Application / Website, User Content, and CureBharat  Content are protected under applicable intellectual</div>
<div style="margin-bottom: 8px; font-weight: 500;">property laws.</div>
<div style="margin-bottom: 8px; font-weight: 500;">All intellectual property associated with the Application / Website, including software, techniques, and processes</div>
<div style="margin-bottom: 8px; font-weight: 500;">used therein, is exclusively owned by CureBharat  or its licensors. As a user, you are granted a limited, non</div>
<div style="margin-bottom: 8px; font-weight: 500;">exclusive, non-transferable license to access and use the Application / Website in accordance with the terms of the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Agreement. Use of the Application / Website does not grant any implied or explicit intellectual property rights from</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  to you regarding these works.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  and/or its licensors retain all proprietary rights to names and trademarks present in the Application /</div>
<div style="margin-bottom: 8px; font-weight: 500;">Website. Specifically, the name and logo of "CureBharat " constitute trademarks and copyrights (including other</div>
<div style="margin-bottom: 8px; font-weight: 500;">applicable intellectual property rights) of CureBharat  and/or its licensors. Unauthorized use of these identifiers,</div>
<div style="margin-bottom: 8px; font-weight: 500;">except as permitted by written agreement, constitutes infringement and may be actionable under relevant laws.</div>
<div style="margin-bottom: 8px; font-weight: 500;">When accessing the Application / Website as per the Agreement, CureBharat  grants you a limited, royalty-free right</div>
<div style="margin-bottom: 8px; font-weight: 500;">to utilize CureBharat  Content solely for personal, non-commercial use within India during the term of the Agreement.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Unless expressly stated in the Agreement, no license or intellectual property rights are conferred upon you, whether</div>
<div style="margin-bottom: 8px; font-weight: 500;">by estoppel, implication, or otherwise.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Except where explicitly authorized by CureBharat , you agree not to reproduce, modify, sell, distribute, mirror, frame,</div>
<div style="margin-bottom: 8px; font-weight: 500;">republish, download, transmit, or create derivative works based on CureBharat  Content, in whole or in part, by any</div>
<div style="margin-bottom: 8px; font-weight: 500;">means. You must not remove or alter any copyright, trademark, or ownership notices.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">6. Rights in User Content:</div>
<div style="margin-bottom: 8px; font-weight: 500;">You acknowledge that you are the sole owner of all rights, including intellectual property rights, in the User Content</div>
<div style="margin-bottom: 8px; font-weight: 500;">posted on the Application / Website or provided to CureBharat .</div>
<div style="margin-bottom: 8px; font-weight: 500;">To the extent permitted by law, you grant CureBharat  a perpetual, irrevocable, worldwide, royalty-free license to use</div>
`), 
  pageShell(7, `
<div style="margin-bottom: 8px; font-weight: 500;">such User Content, including rights to copy, distribute, display, reproduce, modify, adapt, and create derivative</div>
<div style="margin-bottom: 8px; font-weight: 500;">works from the User Content.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">7. User Content and Privacy:</div>
<div style="margin-bottom: 8px; font-weight: 500;">In the course of your interaction with the Application / Website or CureBharat  services, certain identifiable personal</div>
<div style="margin-bottom: 8px; font-weight: 500;">information may be required from you. The processing and usage of such information is governed by these Terms and</div>
<div style="margin-bottom: 8px; font-weight: 500;">Conditions, the Privacy Policy, and the applicable Data Collection Notice.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You may upload identifiable health information—including physical, physiological, and mental health data, as well</div>
<div style="margin-bottom: 8px; font-weight: 500;">as Medical Information—to the Application / Website. This information may be accessed by CureBharat  and/or</div>
<div style="margin-bottom: 8px; font-weight: 500;">Healthcare Service Providers (HSPs) during service provision. If you are a Secondary User, your information may be</div>
<div style="margin-bottom: 8px; font-weight: 500;">submitted by the Primary User whose account you are using. If you have not lawfully authorized the Primary User to</div>
<div style="margin-bottom: 8px; font-weight: 500;">do so, please contact us immediately via email at support@CureBharat .com.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Personal Information may be collected when you use the Application / Website and its features. Please refer to our</div>
<div style="margin-bottom: 8px; font-weight: 500;">Privacy Policy and Data Collection Notice for details regarding collection, storage, use, processing, transfer, and</div>
<div style="margin-bottom: 8px; font-weight: 500;">disclosure of such information.</div>
<div style="margin-bottom: 8px; font-weight: 500;">While using the Application / Website and related services, you may generate or be required to provide information in</div>
<div style="margin-bottom: 8px; font-weight: 500;">the following categories:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. Name of patient, caregiver, doctor, or health care professional;</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. Address (including country and postal code);</div>
<div style="margin-bottom: 8px; font-weight: 500;">c. Location information, including your GPS location;</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. Phone number or mobile number;</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. Email address;</div>
<div style="margin-bottom: 8px; font-weight: 500;">f. Physical, physiological, and mental health condition provided by you and/or your health care professional or</div>
<div style="margin-bottom: 8px; font-weight: 500;">accessible from your medical information;</div>
<div style="margin-bottom: 8px; font-weight: 500;">g. Personal Information and Medical Information submitted or accessible during your use of the Services;</div>
<div style="margin-bottom: 8px; font-weight: 500;">h. Valid financial information at the time of purchase of products/services and/or online payments;</div>
<div style="margin-bottom: 8px; font-weight: 500;">i. CureBharat  login ID and password;</div>
<div style="margin-bottom: 8px; font-weight: 500;">j. User details as provided at registration or afterward;</div>
<div style="margin-bottom: 8px; font-weight: 500;">k. Records of interactions with CureBharat  representatives;</div>
<div style="margin-bottom: 8px; font-weight: 500;">l. Usage details such as time, frequency, duration, and pattern of use, features used, and the amount of storage</div>
<div style="margin-bottom: 8px; font-weight: 500;">consumed;</div>
<div style="margin-bottom: 8px; font-weight: 500;">m. Master and transaction data and other data stored in your user account;</div>
<div style="margin-bottom: 8px; font-weight: 500;">n. Internet Protocol address, browser type, language, referring URL, files accessed, errors generated, time zone,</div>
<div style="margin-bottom: 8px; font-weight: 500;">operating system, and other visitor details collected in our log files;</div>
<div style="margin-bottom: 8px; font-weight: 500;">o. User tracking information such as device ID, Google Advertising ID, and Android ID; and</div>
<div style="margin-bottom: 8px; font-weight: 500;">p. Any other information willingly shared by you.</div>
<div style="margin-bottom: 8px; font-weight: 500;">By clicking on the "I accept" tab when registering or accessing the Application/Website, or otherwise providing your</div>
<div style="margin-bottom: 8px; font-weight: 500;">personal information to use any service, you specifically consent to our Terms and Conditions, Privacy Policy, and</div>
<div style="margin-bottom: 8px; font-weight: 500;">Data Collection Notice, authorizing the collection and processing of your personal information for specified purposes.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  is required by law to maintain the privacy and confidentiality of your personal information. We assure</div>
`), 
  pageShell(8, `
<div style="margin-bottom: 8px; font-weight: 500;">you we take your privacy seriously and strive to maintain the privacy and confidentiality of information you provide</div>
<div style="margin-bottom: 8px; font-weight: 500;">to us. However, we do not represent, warrant, or guarantee that our safeguards against unauthorized access are</div>
<div style="margin-bottom: 8px; font-weight: 500;">foolproof.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Further, CureBharat  may need to access your medical information to address deficiencies, complaints, grievances, or</div>
<div style="margin-bottom: 8px; font-weight: 500;">compliance requirements. You authorize CureBharat  to access and process your data in such cases.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Upon providing this information, we may share it with the concerned healthcare service provider (HSP), affiliates,</div>
<div style="margin-bottom: 8px; font-weight: 500;">service providers, or other third parties within the scope of applicable law, as necessary for service delivery and</div>
<div style="margin-bottom: 8px; font-weight: 500;">where legally required. These parties will be contractually obliged to maintain the same level of confidentiality and</div>
<div style="margin-bottom: 8px; font-weight: 500;">data protection. We do not share your medical information without necessity and strictly limit sharing to providing</div>
<div style="margin-bottom: 8px; font-weight: 500;">required services.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Refusal to share certain information with CureBharat  may result in discontinuation of services.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">8. Other Websites / Mobile Applications:</div>
<div style="margin-bottom: 8px; font-weight: 500;">You may receive links on the Application/Website directing you to third-party websites/applications/content or</div>
<div style="margin-bottom: 8px; font-weight: 500;">service providers ("Third Party Content"). CureBharat  does not make any representations regarding their availability</div>
<div style="margin-bottom: 8px; font-weight: 500;">or performance and is not responsible for their content, terms, privacy policies, or practices.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Links to third-party sites are provided for your convenience only. Please use independent judgment and caution when</div>
<div style="margin-bottom: 8px; font-weight: 500;">visiting or using Third Party Content via links on our site. If you choose to follow these links, you do so voluntarily.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Your use of such content is subject to their terms of use, and CureBharat  is not liable for your use.</div>
<div style="margin-bottom: 8px; font-weight: 500;">We do not extend the agreement to any other websites/applications except our own. We make no warranties</div>
<div style="margin-bottom: 8px; font-weight: 500;">regarding personal information disclosed by you to other sites, even if they are linked to ours.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  does not endorse any Third Party Content found through our Application/Website.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">9. CureBharat 's Responsibilities:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. Healthcare Service Provider (HSP) Credibility:</div>
<div style="margin-bottom: 8px; font-weight: 500;">i. CureBharat  will make available qualified HSPs after appropriate background and reference checks.</div>
<div style="margin-bottom: 8px; font-weight: 500;">ii. Our obligation to verify HSP qualifications is limited to ensuring their registration with relevant state or central</div>
<div style="margin-bottom: 8px; font-weight: 500;">professional councils at the time of engagement.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You are free to report any issues or deficiencies regarding HSPs. Such deficiencies allow you to request an alternative</div>
<div style="margin-bottom: 8px; font-weight: 500;">HSP for your chosen services.</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. Service Levels:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Subject to applicable law, CureBharat  will use commercially reasonable efforts to make the Application/Website</div>
<div style="margin-bottom: 8px; font-weight: 500;">available to registered users and their beneficiaries 24/7, except for:</div>
<div style="margin-bottom: 8px; font-weight: 500;">i. Services involving product delivery (including medicines/drugs);</div>
<div style="margin-bottom: 8px; font-weight: 500;">ii. Planned downtime communicated in advance;</div>
<div style="margin-bottom: 8px; font-weight: 500;">iii. Unavailability caused by circumstances beyond our control (cyber-attacks, acts of God, government actions,</div>
<div style="margin-bottom: 8px; font-weight: 500;">floods, fires, earthquakes, civil unrest, strikes, internet failures or delays, denial-of-service attacks, and user actions</div>
<div style="margin-bottom: 8px; font-weight: 500;">or omissions, etc.);</div>
<div style="margin-bottom: 8px; font-weight: 500;">iv. When service is rendered under a schedule, our obligation is limited to making it available during the scheduled</div>
<div style="margin-bottom: 8px; font-weight: 500;">time, also subject to (ii) and (iii);</div>
`), 
  pageShell(9, `
<div style="margin-bottom: 8px; font-weight: 500;">v. When the registered user is outside our operational coverage.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  has no responsibility toward non-registered users for providing services. Our responsibility toward</div>
<div style="margin-bottom: 8px; font-weight: 500;">registered users is limited to service provision per the terms of this Agreement.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If CureBharat  suspects illegal, wrongful, or fraudulent activity by any user, we reserve the right to notify government</div>
<div style="margin-bottom: 8px; font-weight: 500;">or law enforcement authorities and cooperate fully in investigations or requests for access/information. We may</div>
<div style="margin-bottom: 8px; font-weight: 500;">refuse service at any time without explanation.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  reserves the right to add, remove, or modify functionality in its Services as deemed fit, and release</div>
<div style="margin-bottom: 8px; font-weight: 500;">newer versions accordingly. All users will be notified upon such releases, and CureBharat  may automatically</div>
<div style="margin-bottom: 8px; font-weight: 500;">upgrade all users to the latest version.</div>
<div style="margin-bottom: 8px; font-weight: 500;">The Application/Website and Services may be subject to limitations such as storage space, bandwidth, unexpected</div>
<div style="margin-bottom: 8px; font-weight: 500;">downtime, unavailability of HSPs, etc.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  may schedule, reschedule, or cancel appointments and switch HSPs at any time without prior notice.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Refund and cancellation terms are specified below.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">10. Legal Compliances:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  will take all reasonable measures to comply with central and state government regulations and</div>
<div style="margin-bottom: 8px; font-weight: 500;">directives as applicable.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You may be required to complete certain tasks or verifications. By accepting these Terms and Conditions, you agree</div>
<div style="margin-bottom: 8px; font-weight: 500;">to comply when requested. You remain free to refuse verification or obligations, giving CureBharat  the right to refuse</div>
<div style="margin-bottom: 8px; font-weight: 500;">service or re-evaluate the relationship.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">11. Data Collection Recording, Storage, Encryption &amp; Usage:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Information entered into the Application/Website may be provided by you or a HSP during services provided by</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat . Information collected may be stored on your mobile device, a third-party cloud platform ("Cloud Service</div>
<div style="margin-bottom: 8px; font-weight: 500;">Provider"), or server ("Storage Service Provider").</div>
<div style="margin-bottom: 8px; font-weight: 500;">All information you provide to CureBharat  while using the Application/Website or its services is provided knowingly</div>
<div style="margin-bottom: 8px; font-weight: 500;">and with authorization, understanding it will be processed accordingly.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You hereby grant CureBharat  explicit consent to collect and store your information as follows:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. Upon registration on our Application or Website,</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. When you provide your Personal Information to us,</div>
<div style="margin-bottom: 8px; font-weight: 500;">c. During the delivery of Services to you,</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. When you utilize features on our Application or Website,</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. Through your device, after you have granted permissions to our Application or Website (as outlined below),</div>
<div style="margin-bottom: 8px; font-weight: 500;">f. Via cookies (further discussed below).</div>
<div style="margin-bottom: 8px; font-weight: 500;">You provide informed, voluntary, and unconditional consent for CureBharat  to use the collected and stored</div>
<div style="margin-bottom: 8px; font-weight: 500;">information in all legally permissible ways to achieve the following purposes:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. To operate and enhance the Application or Website;</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. To deliver efficient and personalized services to you;</div>
<div style="margin-bottom: 8px; font-weight: 500;">c. To conduct studies, research, and analysis for the purpose of improving our information, analytics, services, and</div>
<div style="margin-bottom: 8px; font-weight: 500;">technologies, as well as ensuring that content and advertising are tailored to your interests and preferences;</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. To contact you via phone, SMS, email, or third-party communication platforms (such as WhatsApp) regarding</div>
`), 
  pageShell(10, `
<div style="margin-bottom: 8px; font-weight: 500;">appointments, technical matters, payment reminders, and security notifications;</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. To send promotional communications from us or our channel partners via SMS, email, postal mail, or third-party</div>
<div style="margin-bottom: 8px; font-weight: 500;">communication platforms (such as WhatsApp, Facebook, etc.);</div>
<div style="margin-bottom: 8px; font-weight: 500;">f. To advertise products and services offered by CureBharat  and third parties;</div>
<div style="margin-bottom: 8px; font-weight: 500;">g. To transfer information about you if we are acquired by or merged with another company;</div>
<div style="margin-bottom: 8px; font-weight: 500;">h. To share information with affiliates, business partners, or vendors in order to meet contractual or operational</div>
<div style="margin-bottom: 8px; font-weight: 500;">requirements for services requested by you;</div>
<div style="margin-bottom: 8px; font-weight: 500;">i. To administer or fulfill our legal and regulatory obligations relating to any agreement you have with us;</div>
<div style="margin-bottom: 8px; font-weight: 500;">j. To build your profile on the Application or Website;</div>
<div style="margin-bottom: 8px; font-weight: 500;">k. To respond to summons, court orders, or legal processes, or to establish or exercise our legal rights or defend</div>
<div style="margin-bottom: 8px; font-weight: 500;">against legal claims;</div>
<div style="margin-bottom: 8px; font-weight: 500;">l. To investigate, prevent, or take action related to illegal activities, suspected fraud, violations of our Terms and</div>
<div style="margin-bottom: 8px; font-weight: 500;">Conditions, breaches of agreements with you, or as otherwise required by law;</div>
<div style="margin-bottom: 8px; font-weight: 500;">m. To aggregate anonymized personal information for research, statistical analysis, and business intelligence</div>
<div style="margin-bottom: 8px; font-weight: 500;">purposes, and to sell or otherwise transfer such research, statistical, or intelligence data.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  may share aggregated or non-identifiable data with third parties and affiliates. Personal Information will</div>
<div style="margin-bottom: 8px; font-weight: 500;">be retained for at least three years from your last interaction, or longer if required by law; transaction and</div>
<div style="margin-bottom: 8px; font-weight: 500;">engagement history is kept for seven years after your account ends. Communications with CureBharat  and its</div>
<div style="margin-bottom: 8px; font-weight: 500;">service providers are stored for the duration of your relationship and for seven years afterwards. Records of</div>
<div style="margin-bottom: 8px; font-weight: 500;">consultations and messages between users and healthcare providers are maintained for legal purposes and may be</div>
<div style="margin-bottom: 8px; font-weight: 500;">reviewed for quality, but identifying information is omitted during routine checks.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If a data breach occurs, CureBharat  will notify you promptly about the nature and impact, along with corrective</div>
<div style="margin-bottom: 8px; font-weight: 500;">actions. Your Personal Information may be transferred internationally to affiliates, partners, or service providers</div>
<div style="margin-bottom: 8px; font-weight: 500;">according to applicable laws and contractual safeguards to ensure adequate protection equivalent to Indian data</div>
<div style="margin-bottom: 8px; font-weight: 500;">standards. While CureBharat  requires third parties to protect your information with the same care, it cannot be held</div>
<div style="margin-bottom: 8px; font-weight: 500;">liable for breaches caused by cyberattacks, force majeure, or uncontrollable events.</div>
<div style="margin-bottom: 8px; font-weight: 500;">User Content is not pre-screened but may be monitored or removed if it violates policies or laws, with reasonable</div>
<div style="margin-bottom: 8px; font-weight: 500;">attempts to inform affected users. All User Content is securely stored on cloud servers with best efforts made to</div>
<div style="margin-bottom: 8px; font-weight: 500;">maintain encryption and security; however, CureBharat  is not responsible for theft from its systems or third-party</div>
<div style="margin-bottom: 8px; font-weight: 500;">databases. Transaction and purchase histories are maintained, and content may be deleted if inactive for ten years.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">12. User Responsibilities:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Abide by all terms and conditions;</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Provide accurate health and personal information;</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Follow instructions given by healthcare providers;</span></div>
`), 
  pageShell(11, `
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Do not alter or delete website content without permission;</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Do not decipher, decompile, reverse engineer, or disassemble the application/website.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  Content:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">You must not use any engine, software, tool, agent, or other device (such as spiders, robots, avatars, or</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">intelligent agents) to navigate or search the Application/Website.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Do not remove any copyright, trademark registration, or other proprietary notices from the</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Application/Website. You also agree not to access or use this Application/Website in any way that could</div>
<div style="margin-bottom: 8px; font-weight: 500;">harm its operation or content.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Framing, hotlinking, or deeplinking to any CureBharat  content is prohibited.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Do not use the Application/Website or its services unlawfully or in ways that could harm CureBharat  or any</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">other person or entity, as determined solely by CureBharat .</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Avoid engaging in any type of antisocial, disruptive, or destructive acts, including but not limited to "flaming",</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">"spamming", "flooding", "trolling", "phishing", or "griefing" as these terms are commonly understood online.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">You must not host, display, upload, modify, publish, transmit, update, or share any information that:</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Is unlawful or harms CureBharat  or any other person or entity, as determined by CureBharat  at its</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">discretion.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Belongs to someone else and for which you do not have sufficient legal rights.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Harms minors in any way.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Infringes any patent, trademark, copyright, or other proprietary rights; or violates any applicable</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">law.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Deceives or misleads recipients about the origin of messages, or communicates information that is</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">grossly offensive or menacing.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Impersonates another person.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Contains software viruses or any other code, files, or programs intended to interrupt, destroy, or</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">limit the functionality of any computer resource.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Threatens the unity, integrity, defence, security, or sovereignty of India, friendly relations with</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">foreign states, public order, incites crime, hinders investigations, or insults any nation.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If CureBharat  believes you have violated any terms or conditions of the Agreement, it may, at its sole discretion:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Suspend provision of services;</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Suspend your account until CureBharat  can determine whether there was a violation;</span></div>
`), 
  pageShell(12, `
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Suspend or terminate your account if it determines a violation occurred;</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Require compensation for any loss or damage caused to CureBharat  as a condition for lifting suspension;</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Take any other action permitted by law;</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Invoice you for services used;</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Disable and/or delete content that breaches the Agreement, while preserving records for government</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">production if necessary.</div>
<div style="margin-bottom: 8px; font-weight: 500;">authorities for investigation purposes.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">13. Payment, Fees and Taxes:</div>
<div style="margin-bottom: 8px; font-weight: 500;">You agree to pay all applicable service fees, consulting fees, reasonable out-of-pocket expenses, and any other</div>
<div style="margin-bottom: 8px; font-weight: 500;">charges associated with your use of the Services. While CureBharat  will endeavour to provide you with an accurate</div>
<div style="margin-bottom: 8px; font-weight: 500;">estimate of fees in advance, the final fee may depend on the specific Services you select and may fluctuate based on</div>
<div style="margin-bottom: 8px; font-weight: 500;">the quantity or duration of your subscription.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You are solely responsible for fulfilling all tax obligations, legal requirements, statutory registrations, and reporting</div>
<div style="margin-bottom: 8px; font-weight: 500;">related to your payments. CureBharat  accepts no liability for any taxes except its own income tax.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Fees may be paid online through facilities provided on the Application or Website. The processing of online fee</div>
<div style="margin-bottom: 8px; font-weight: 500;">payments requires third-party payment service provider assistance, and CureBharat  is not liable for any loss or</div>
<div style="margin-bottom: 8px; font-weight: 500;">damage incurred by Users during this process as these providers operate independently of CureBharat 's control.</div>
<div style="margin-bottom: 8px; font-weight: 500;">All fees are exclusive of taxes. The payment process is considered complete only upon receipt of the payment into</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat ’s designated bank account.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Invoices for fees corresponding to Services received will be generated periodically and communicated to you via the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Application, Website, or your contact details. You may be asked to make payment either immediately or at a later</div>
<div style="margin-bottom: 8px; font-weight: 500;">date, at the sole discretion of</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat . If payment for Services is not received within the specified time, CureBharat  may immediately stop</div>
<div style="margin-bottom: 8px; font-weight: 500;">providing Services, permanently delete your account and all related information, and suspend or terminate the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Agreement. You alone will be responsible for any consequences resulting from failure to pay the fees on time.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  has no obligation to compensate you in any form. To process payments, CureBharat  may need your</div>
<div style="margin-bottom: 8px; font-weight: 500;">bank or credit card details; see our Privacy Policy for usage information. You will receive a fee receipt via email or</div>
<div style="margin-bottom: 8px; font-weight: 500;">contact within seven business days of payment. No extra fees will be charged for storing or analyzing your personal</div>
<div style="margin-bottom: 8px; font-weight: 500;">information, unless specified in paid packages or value-added services.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">14. EMI and Buy Now Pay Later Payment Method:</div>
<div style="margin-bottom: 8px; font-weight: 500;">These terms apply to all transactions using the EMI or Buy Now Pay Later ("BNPL") payment options on the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Application/Website:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. BNPL allows users to pay for services in instalments. When a user chooses BNPL, they transact with our lending</div>
<div style="margin-bottom: 8px; font-weight: 500;">partner (and co-lender, if applicable). The lending partner provides credit to make purchases and pay later in</div>
`), 
  pageShell(13, `
<div style="margin-bottom: 8px; font-weight: 500;">instalments. Credit approval checks may be conducted at their discretion before offering this facility.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  has no role to play pertaining to the offering of the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Facility or the terms on which the Facility is provided by Lending</div>
<div style="margin-bottom: 8px; font-weight: 500;">Partner and its co-lender, including but not limited to its</div>
<div style="margin-bottom: 8px; font-weight: 500;">issuance, approval, extension, pre-closure or closure of the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Facility and such matters are solely determined by Lending</div>
<div style="margin-bottom: 8px; font-weight: 500;">Partner.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Facility usage and repayment are subject to the terms.</div>
<div style="margin-bottom: 8px; font-weight: 500;">The Lending Partner will notify you about repayments as needed. CureBharat  and its Lending Partners may offer</div>
<div style="margin-bottom: 8px; font-weight: 500;">several methods for repaying the Facility, including through the Application, Website, or other available options.</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. By using BNPL and the Facility from the Lending Partner and its co-lender, each User releases CureBharat  and its</div>
<div style="margin-bottom: 8px; font-weight: 500;">affiliates from all related claims; any such claims will be directed solely to the Lending Partner.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">15. Offers and Promotions:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  and HSP may periodically promote their Services and provide opportunities for You to purchase such</div>
<div style="margin-bottom: 8px; font-weight: 500;">Services via the Application or Website. While We strive to encourage HSP to deliver high-quality Services and</div>
<div style="margin-bottom: 8px; font-weight: 500;">materials at competitive prices, We do not have control over their offerings, nor do We endorse the Services provided</div>
<div style="margin-bottom: 8px; font-weight: 500;">or guarantee their suitability for Your requirements. It is Your responsibility to ensure these Services meet Your</div>
<div style="margin-bottom: 8px; font-weight: 500;">needs; We assume no liability in this regard. All promotions are available for a limited period and are subject to</div>
<div style="margin-bottom: 8px; font-weight: 500;">specific terms and conditions, which apply in addition to the Terms and Conditions set forth herein.</div>
<div style="margin-bottom: 8px; font-weight: 500;">For the avoidance of doubt, it is hereby clarified that any mention of the term "offer/offered for sale" by the HSP in the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Agreement shall be interpreted exclusively as an "invitation to offer for sale" by the respective HSP.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">16. Reimbursement of Claims and OPD Services in Purchased Packages:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  may specify a coverage amount or service quantity for OPD services within its packages. Customers</div>
<div style="margin-bottom: 8px; font-weight: 500;">must follow these terms when making claims or using OPD services:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">All claims require documents proving:</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">The covered disease condition exists as per the package.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Payment was made to the relevant service provider for the service.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Reimbursement claims for uncontested cases will be processed within 7 days of claim submission if no</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">further information is needed.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Cashless claims for uncontested cases will be processed within 3 hours of claim submission, provided no</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">additional clarifications are required.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Processing times may be delayed if extra clarification or corrections are necessary.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Based on your package, you can claim either cashless service or reimbursement if you use a provider outside</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  .</div>
`), 
  pageShell(14, `
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">If both reimbursement and cashless options are available, CureBharat   will prioritise cashless claims within</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">its network; only if this is not possible will reimbursement apply.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Unless stated otherwise in policy details, all documents submitted for claims must show a service date after</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">the package purchase date.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Unless specified, there is a mandatory 7-day waiting period from the package purchase date before making</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">a claim.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">All supporting physician prescriptions and clinical notes must include:</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">a. The prescribing doctor's name, medical registration number, contact information, and address;</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. The patient’s full name;</div>
<div style="margin-bottom: 8px; font-weight: 500;">c. Diagnosis for the visit;</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. Date of consultation;</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. Prescribed medication names, dosages, frequencies, and durations for which the medicines should be taken;</div>
<div style="margin-bottom: 8px; font-weight: 500;">f. Any laboratory or diagnostic investigations required for the patient, where clinically indicated;</div>
<div style="margin-bottom: 8px; font-weight: 500;">g. The prescribing physician’s signature.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Customers requesting reimbursement must submit KYC documents for bank account verification. This</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">includes providing PAN card details and a cancelled cheque bearing the name of the primary subscriber.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">10. Reimbursements will only be credited to KYC-approved bank accounts of the primary subscriber associated with</div>
<div style="margin-bottom: 8px; font-weight: 500;">the package. Claims raised for family members will also be credited to the primary subscriber's account.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">11. Customers should promptly update their bank account details if there are any changes to KYC or account</div>
<div style="margin-bottom: 8px; font-weight: 500;">information before submitting claims.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">12. Only readable scans of original documents will be accepted as supporting documents. Claims supported by</div>
<div style="margin-bottom: 8px; font-weight: 500;">photocopies will be rejected.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">13. The prescription, clinical notes, and bills submitted as evidence for a claim must all reflect the same patient’s</div>
<div style="margin-bottom: 8px; font-weight: 500;">name.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">14. Claims initiated in the name of family members will be accepted solely when the purchased package covers</div>
<div style="margin-bottom: 8px; font-weight: 500;">multiple members. In such cases, all supporting documents must clearly reference the family member against whom</div>
<div style="margin-bottom: 8px; font-weight: 500;">the claim is made.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">15. If a claim is found to be fraudulent, CureBharat   reserves the right to blacklist the subscriber. Blacklisted</div>
<div style="margin-bottom: 8px; font-weight: 500;">subscribers will be prohibited from raising further claims under their purchased package.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">16. Reasons for blacklisting include, but are not limited to: editing, tampering, modifying, forging, digitally</div>
<div style="margin-bottom: 8px; font-weight: 500;">manipulating, or overwriting a bill, clinical note, or prescription.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">19. If further evidence is required to support a claim, CureBharat  may request additional documentation from the</div>
<div style="margin-bottom: 8px; font-weight: 500;">subscriber.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">20. CureBharat   reserves the right to deny a claim at its sole discretion for reasons including, but not limited to:</div>
`), 
  pageShell(15, `
<div style="margin-bottom: 8px; font-weight: 500;">a. Claims pertaining to non-healthcare expenses;</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. Claims that are clinical but unrelated to the underlying disease condition cited in the prescription or clinical note;</div>
<div style="margin-bottom: 8px; font-weight: 500;">c. Claims lacking valid supporting documentation;</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. Claims incurred prior to the effective start date of the purchased package;</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. Prescriptions or clinical notes deemed outdated, defined as older than 15 days from the bill date for acute</div>
<div style="margin-bottom: 8px; font-weight: 500;">ailments, or older than 90 days from the bill date for chronic ailments;</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Service date on the prescription, clinical note, or bill is before the package purchase date</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Member name on documents does not match subscriber or tagged family member</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Incomplete documents attached to claim</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Claimed amount differs from that on the bill</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Package or sub-limit amount exhausted</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Claim exceeds allowable frequency for the package</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Missing clinical or other required details in documentation per claim category</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Prescription or clinical note generated by a non-allopathic doctor (not MBBS, MD, MS, McH, DM, DNB, Post</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">MBBS diplomas or CPS certifications)</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">21. Ailment/Illness – Refers to any sickness or disease that impairs normal body function and requires medical</div>
<div style="margin-bottom: 8px; font-weight: 500;">treatment.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">22. Acute Condition – A disease, illness, or injury that responds quickly to treatment, aiming for full recovery to the</div>
<div style="margin-bottom: 8px; font-weight: 500;">previous state of health.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">23. • Chronic Condition – A disease, illness, or injury with one or more of the following: requires ongoing monitoring or</div>
<div style="margin-bottom: 8px; font-weight: 500;">symptom control, needs rehabilitation or special training to manage, continues indefinitely, or is likely to recur.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">24. Subscribers can dispute rejected claims by emailing supporting documents and claim details to</div>
<div style="margin-bottom: 8px; font-weight: 500;">support@CureBharat.com.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">25. Package benefit amounts are non-transferable and non-refundable; any unclaimed benefits expire and cannot be</div>
<div style="margin-bottom: 8px; font-weight: 500;">converted to cash or withdrawn.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">26. Some packages require co-pay or co-deductible amounts, which will be deducted before claims are processed.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">27. CureBharat   may reinvestigate past approved claims if fraud is suspected; subscribers must repay amounts from</div>
<div style="margin-bottom: 8px; font-weight: 500;">fraudulent or incorrect claims, and CureBharat   may adjust these against future claims.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">28. CureBharat   reserves the right to modify or update these terms and conditions at any time during the policy</div>
<div style="margin-bottom: 8px; font-weight: 500;">period. CureBharat   also reserves the sole discretion to terminate or suspend OPD benefits associated with a specific</div>
<div style="margin-bottom: 8px; font-weight: 500;">package. Customers will be notified of any changes.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">29. Outpatient benefits do not include any services related to inpatient (IPD) treatment, procedures, or follow-ups.</div>
`), 
  pageShell(16, `
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">30. If your purchased plan includes AYUSH-related claims, only consultations done by BAMS or BHMS physicians</div>
<div style="margin-bottom: 8px; font-weight: 500;">registered with MCI/NMC registries will be eligible.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">31. Below are specific documentation guidelines for different categories of claims. These are in addition to the general</div>
<div style="margin-bottom: 8px; font-weight: 500;">apply:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Medicine Claims Requirements:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Both the bill and the doctor’s prescription must be uploaded for any medicine claim.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Bills should contain the pharmacy's GSTIN and drug license numbers.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Bills need to clearly show the invoice number, date of service, and the patient's name.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">The prescribed medicines should be clearly listed on the bill.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Bills must state the total amount charged.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Unless specified otherwise, submit claims within 30 days from the prescription date.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">For acute ailments, the prescription date should be within 7 days before purchasing the medicines.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Consultation Claims Requirements:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Attach both a prescription note and a bill or receipt from the attending physician indicating payment</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">received.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">The attending doctor's name must be the same on both the prescription and the consultation bill.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Only prescriptions from allopathic doctors are accepted.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Unless stated otherwise, submit claims within 30 days from the prescription date.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Lab and Diagnostics Claims Requirements:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Lab and diagnostics reports must have an authorized signature from the attending physician.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">The lab report must display the NABL (National Accreditation Board for Testing and Calibration) details.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Laboratories:</div>
<div style="margin-bottom: 8px; font-weight: 500;">iii. The laboratory and diagnostics bill must contain the facility's name, address, contact information, and GSTIN</div>
<div style="margin-bottom: 8px; font-weight: 500;">number.</div>
<div style="margin-bottom: 8px; font-weight: 500;">iv. All prescribed tests should be clearly listed on the bill. Unless stated otherwise, claims should be filed within 30</div>
<div style="margin-bottom: 8px; font-weight: 500;">days from the prescription date.</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. Vision Claims Requirements:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Vision claims cover costs related to eye exams, vision correction procedures, and treatments prescribed by qualified</div>
<div style="margin-bottom: 8px; font-weight: 500;">ophthalmologists.</div>
<div style="margin-bottom: 8px; font-weight: 500;">ii. Every claim under the Vision services category must include the necessary medical documentation such as clear</div>
<div style="margin-bottom: 8px; font-weight: 500;">bills, receipts, prescriptions, and details of clinical procedures from certified eye care professionals.</div>
<div style="margin-bottom: 8px; font-weight: 500;">iii. Unless otherwise noted, cosmetic procedures, lenses, frames, sunglasses, goggles, or associated equipment are</div>
<div style="margin-bottom: 8px; font-weight: 500;">not covered under vision claims.</div>
`), 
  pageShell(17, `
<div style="margin-bottom: 8px; font-weight: 500;">iv. Unless specified differently, claims must be submitted within 30 days of the prescription date.</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. Dental Claims Requirements:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Dental claims, if applicable, only cover routine check-ups, cleanings, preventive treatments, fillings, extractions, root</div>
<div style="margin-bottom: 8px; font-weight: 500;">canals, and dental crowns linked to a root canal or a clinically required procedure.</div>
<div style="margin-bottom: 8px; font-weight: 500;">ii. Cosmetic dental procedures are not included in the package unless specifically mentioned; this includes but is not</div>
<div style="margin-bottom: 8px; font-weight: 500;">limited to teeth whitening, bridges, crowns, and alignment corrections.</div>
<div style="margin-bottom: 8px; font-weight: 500;">iii. Unless otherwise stated, dental claims must be submitted within 30 days of the prescription date.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Home-care Claims Requirements:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Home-care claims relate to expenses for home-based healthcare services such as attendants, nurses, and</div>
<div style="margin-bottom: 8px; font-weight: 500;">physiotherapists.</div>
<div style="margin-bottom: 8px; font-weight: 500;">ii. A physician’s prescription from the relevant clinical specialty, indicating the need for home care, is required for any</div>
<div style="margin-bottom: 8px; font-weight: 500;">home healthcare claim.</div>
<div style="margin-bottom: 8px; font-weight: 500;">iii. All claims must include proper documentation such as invoices, receipts, and service reports from qualified home</div>
<div style="margin-bottom: 8px; font-weight: 500;">healthcare providers.</div>
<div style="margin-bottom: 8px; font-weight: 500;">iv. Services related to inpatient treatment are not covered under home-care claims.</div>
<div style="margin-bottom: 8px; font-weight: 500;">v. Unless otherwise specified, home-care claims should be filed within 30 days from the prescription date.</div>
<div style="margin-bottom: 8px; font-weight: 500;">g. Vaccine Claims Requirements:</div>
<div style="margin-bottom: 8px; font-weight: 500;">i. Only preventive vaccines and immunization expenses are covered; other healthcare costs are excluded.</div>
<div style="margin-bottom: 8px; font-weight: 500;">ii. Vaccine claims require a prescription from a relevant clinical specialist.</div>
<div style="margin-bottom: 8px; font-weight: 500;">iii. Reimbursement is allowed only for vaccines approved by the Ministry of Health and Family Welfare under the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Universal Immunization Program.</div>
<div style="margin-bottom: 8px; font-weight: 500;">iv. Submit claims within 30 days of prescription unless stated otherwise.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Ambulance Claims Requirements:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Ambulance claims are cashless unless specified otherwise.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Service is available only in designated pin codes within a 20 km radius.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Ambulances are provided for emergencies only and transport patients from their residence to the nearest</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">suitable hospital.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Clinical documents must be shared proving emergency status for previous ambulance use before requesting</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">further service. Requests may be denied if documentation is missing.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Ambulance response time is up to 60 minutes from the request.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">CureBharat  may reject requests deemed non-emergencies.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Patients who were immobile due to pre-existing disabilities before the policy purchase date are not eligible.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">a. Telemedicine Consultation: Users can schedule consultations with registered healthcare practitioners by specialty</div>
<div style="margin-bottom: 8px; font-weight: 500;">through our platform.</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. Home Health Services: Users can book specialized personnel for home-based healthcare using the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Application/Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Infertility Claim Requirements:</div>
`), 
  pageShell(18, `
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Claims are limited to consultations, diagnostics, and medications related to infertility treatments when</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">covered.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Submit claims within 30 days of prescription unless specified otherwise.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Laboratory Testing: Users may register for tests on the Application/Website; testing occurs at affiliated laboratories.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Imaging/Scans: When covered, claims for imaging/scans follow your policy terms.</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. One Circle Health Plan: We offer a comprehensive healthcare service plan accessible and editable via the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Application/Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Website</div>
<div style="margin-bottom: 8px; font-weight: 500;">It is required to submit a doctor's prescription together with scans, X-rays, diagnostic films, reports, and the</div>
<div style="margin-bottom: 8px; font-weight: 500;">corresponding bills to process your claim. Unless otherwise specified, claims must be submitted within 30 days from</div>
<div style="margin-bottom: 8px; font-weight: 500;">the date of prescription.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Use of Services</div>
<div style="margin-bottom: 8px; font-weight: 500;">The Application/Website provides access to various healthcare and wellness services. The services you can use</div>
<div style="margin-bottom: 8px; font-weight: 500;">depend on your registration status and any restrictions outlined in the Agreement or by CureBharat .</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">17. Representations and Warranties:</div>
<div style="margin-bottom: 8px; font-weight: 500;">By using the Application, you confirm and guarantee the following:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. You are at least 18 years old and your use of the Application/Website complies with all applicable laws and</div>
<div style="margin-bottom: 8px; font-weight: 500;">regulations.</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. The Application/Website offers features such as health trackers, medicine reminders, and options for storing and</div>
<div style="margin-bottom: 8px; font-weight: 500;">displaying your medical information.</div>
<div style="margin-bottom: 8px; font-weight: 500;">c. Services are non-transferable and cover only the Registered User and beneficiaries identified during registration.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  may alter the rights of beneficiary Secondary Users and their access to services.</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. If a minor uses the Application/Website or any service, you agree to supervise their account personally and take</div>
<div style="margin-bottom: 8px; font-weight: 500;">responsibility for their activity.</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. All registration information you provide is truthful and accurate, and you agree to keep it updated.</div>
<div style="margin-bottom: 8px; font-weight: 500;">f. As a Registered User, you will use the Application/Website solely for personal, non-commercial purposes. Any other</div>
<div style="margin-bottom: 8px; font-weight: 500;">use of the Application/Website or its content is strictly prohibited.</div>
<div style="margin-bottom: 8px; font-weight: 500;">g. You confirm that you have read and understood the Data Collection Notice and freely consent to the collection,</div>
<div style="margin-bottom: 8px; font-weight: 500;">storage, and processing of your personal information for the purposes described therein, including login and account</div>
<div style="margin-bottom: 8px; font-weight: 500;">details.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  is not liable to users or any third parties for claims or damages resulting from the termination or</div>
<div style="margin-bottom: 8px; font-weight: 500;">suspension of user accounts, or actions related to such account changes.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If your account is suspended or terminated (temporarily or permanently), you cannot continue using the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Application/Website under the same or a new account, nor re-register with different credentials.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Users can access a range of features on the Application/Website, but available services may change at our</div>
<div style="margin-bottom: 8px; font-weight: 500;">discretion, with or without prior notice. Key service categories include:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Fair Usage Policy:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat ’s services are for non-commercial personal use only. We reserve the right to limit, suspend, disable, or</div>
`), 
  pageShell(19, `
<div style="margin-bottom: 8px; font-weight: 500;">discontinue any service if it is used for commercial purposes or inappropriately. Our team regularly reviews the</div>
<div style="margin-bottom: 8px; font-weight: 500;">platform to ensure proper use and prevent misuse.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You must not use the Application/Website for illegal activities or anything prohibited by these Terms and Conditions</div>
<div style="margin-bottom: 8px; font-weight: 500;">or applicable laws.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  represents and warrants that:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. The company is duly incorporated under the Companies Act, 2013 and possesses the requisite power and</div>
<div style="margin-bottom: 8px; font-weight: 500;">authority to provide the Services and operate the Application/Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. It holds all necessary permits, approvals, and licenses required to deliver the Services and comply with its</div>
<div style="margin-bottom: 8px; font-weight: 500;">obligations under this Agreement.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Your access to this Application/Website may be terminated immediately at our sole discretion, with or without notice,</div>
<div style="margin-bottom: 8px; font-weight: 500;">should you fail to adhere to these provisions.</div>
<div style="margin-bottom: 8px; font-weight: 500;">All plans offering unlimited consultations are subject to a Fair Usage Policy (FUP), which will apply according to the</div>
<div style="margin-bottom: 8px; font-weight: 500;">following limitations:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. Unlimited GP/Doc-on-call consultation plans: Maximum of sixty consultations.</div>
<div style="margin-bottom: 8px; font-weight: 500;">By entering into this Agreement, CureBharat  does not breach any applicable terms.</div>
<div style="margin-bottom: 8px; font-weight: 500;">consultations</div>
<div style="margin-bottom: 8px; font-weight: 500;">previous agreements made with other parties involved.</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. Unlimited Specialty Consultations Plans: Maximum of sixty consultations</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">18. User Account Suspension:</div>
<div style="margin-bottom: 8px; font-weight: 500;">For Products offering Unlimited Specialist Consultations, the following specialty consultations are not included in the</div>
<div style="margin-bottom: 8px; font-weight: 500;">unlimited offer:</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. Psychiatry |</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. Psychology</div>
<div style="margin-bottom: 8px; font-weight: 500;">Sexology</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. Physiotherapy</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  may revise the fair usage policy at any time at its sole discretion.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If a User breaches the Agreement, if CureBharat  cannot verify or authenticate information provided by the User, or if</div>
<div style="margin-bottom: 8px; font-weight: 500;">the User fails to give the required consent (or revokes it later), CureBharat  has the right to suspend or terminate the</div>
<div style="margin-bottom: 8px; font-weight: 500;">User's account and/or access to the Application/Website by blocking IP addresses or email IDs, with or without</div>
<div style="margin-bottom: 8px; font-weight: 500;">notice. Any suspected illegal, fraudulent, or abusive activity can also result in account suspension or termination.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Once suspended or terminated, the User's ability to use features and services on the Application/Website will end</div>
<div style="margin-bottom: 8px; font-weight: 500;">immediately, and CureBharat  may permanently remove or delete the User’s information.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">1. Doctor Consultation:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  provides telemedicine services for registered users and their beneficiaries. The terms below define the</div>
<div style="margin-bottom: 8px; font-weight: 500;">relationship between the registered user (or beneficiary) and CureBharat  when accessing telemedicine services (also</div>
<div style="margin-bottom: 8px; font-weight: 500;">referred to as "Teleconsultations").</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  retains the right to accept or decline Teleconsultation requests from any user, based on stated reasons.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If your request is rejected, you will be notified and given an explanation for the rejection.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Teleconsultations provided through the Application or Website are not intended for emergency situations. In case of</div>
<div style="margin-bottom: 8px; font-weight: 500;">an emergency, please call an ambulance or visit the nearest hospital. We assume no responsibility or liability for any</div>
<div style="margin-bottom: 8px; font-weight: 500;">injury, death, or disability resulting from a Healthcare Service Provider (HSP) rejecting or failing to address an</div>
`), 
  pageShell(20, `
<div style="margin-bottom: 8px; font-weight: 500;">emergency situation that a user may experience.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You acknowledge that while Teleconsultation will be provided with regard to your situation and its time sensitivity,</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  does not guarantee or advertise specific timelines for when Teleconsultation will be offered once</div>
<div style="margin-bottom: 8px; font-weight: 500;">requested. CureBharat  is not liable for any harm or loss you may suffer due to delays if you choose to access these</div>
<div style="margin-bottom: 8px; font-weight: 500;">Services.</div>
<div style="margin-bottom: 8px; font-weight: 500;">All users who are patients and who opt for Teleconsultation may be required to undergo an initial medical</div>
<div style="margin-bottom: 8px; font-weight: 500;">examination to record their medical history, medication history, and medical status before video-consulting support</div>
<div style="margin-bottom: 8px; font-weight: 500;">can be provided. This initial information gathering will occur via a communication medium chosen by CureBharat ,</div>
<div style="margin-bottom: 8px; font-weight: 500;">depending on the information to be conveyed.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You further confirm that the medical history and health information you provide during the preliminary call is</div>
<div style="margin-bottom: 8px; font-weight: 500;">accurate and current. You agree not to hold CureBharat  accountable for any shortcomings resulting from using only</div>
<div style="margin-bottom: 8px; font-weight: 500;">the information given during the preliminary telephonic call.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If, during information collection or at the time of Teleconsultation, the HSP determines that Teleconsultation is not</div>
<div style="margin-bottom: 8px; font-weight: 500;">suitable for medical analysis and diagnosis in your case, the HSP may inform you and terminate the consultation.</div>
<div style="margin-bottom: 8px; font-weight: 500;">This will not be considered a breach of service, and you will not be entitled to any costs as a result.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Teleconsultations are provided with the user's express consent and should not be seen as a substitute for physical</div>
<div style="margin-bottom: 8px; font-weight: 500;">consultations. The Services are only meant for general consultation. If diagnostic tests are recommended or a</div>
<div style="margin-bottom: 8px; font-weight: 500;">prescription is issued after an online consultation, these are based on the preliminary information and examination</div>
<div style="margin-bottom: 8px; font-weight: 500;">and should not be regarded as definitive, final, or conclusive. The HSP reserves the right to modify prescriptions or</div>
<div style="margin-bottom: 8px; font-weight: 500;">recommended tests if additional information is provided in future consultations.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Teleconsultations may take place through various communication channels including call center helplines, telephones,</div>
<div style="margin-bottom: 8px; font-weight: 500;">mobile devices, tablets, instant messaging chats, online chats, WhatsApp, SMS and text chats, or apps with or</div>
<div style="margin-bottom: 8px; font-weight: 500;">without camera and video functionality, at the sole discretion of CureBharat .</div>
<div style="margin-bottom: 8px; font-weight: 500;">Reasonable efforts will be made to protect your privacy and confidentiality throughout Teleconsultation Services.</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. User Responsibilities and Rights:</div>
<div style="margin-bottom: 8px; font-weight: 500;">You understand that, in addition to the risks associated with receiving treatment via Teleconsultation, there are also</div>
<div style="margin-bottom: 8px; font-weight: 500;">specific risks inherent to this method. The following affirmations are required from you, acknowledging these risks:</div>
<div style="margin-bottom: 8px; font-weight: 500;">You agree that you have the opportunity to request an alternative means of communication for the Teleconsultation. If</div>
<div style="margin-bottom: 8px; font-weight: 500;">you choose to proceed with the medium provided to you, you acknowledge all limitations of that medium.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You confirm that you have access to the necessary technology and telecommunication tools to participate in the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Teleconsultation. You also agree that you may inform CureBharat  if you experience any deficiencies in this regard.</div>
<div style="margin-bottom: 8px; font-weight: 500;">The lack of direct, physical contact between patient and provider may affect the quality of service and treatment</div>
<div style="margin-bottom: 8px; font-weight: 500;">offered. The healthcare service provider (HSP) may notify you of this limitation, and by continuing with the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Teleconsultation, you acknowledge and accept it.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Any resulting deficiency in quality may occur. In certain situations, the information transmitted may be insufficient</div>
`), 
  pageShell(21, `
<div style="margin-bottom: 8px; font-weight: 500;">(for example, poor image resolution) to allow the service provider to make appropriate medical decisions. You agree to</div>
<div style="margin-bottom: 8px; font-weight: 500;">share any additional information required by the healthcare service provider to ensure accurate medical decision</div>
<div style="margin-bottom: 8px; font-weight: 500;">making.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If the information obtained through teleconsultation and the initial call is not adequate, you may need to undergo</div>
<div style="margin-bottom: 8px; font-weight: 500;">testing at a laboratory recommended by CureBharat  or the healthcare service provider.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">In rare cases, security protocols could fail, leading to a breach of your personal medical information. If this</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">occurs, you will be notified about the incident and the data that may have been lost or accessed. You</div>
<div style="margin-bottom: 8px; font-weight: 500;">acknowledge that CureBharat  has followed best practices and protocols.</div>
<div style="margin-bottom: 8px; font-weight: 500;">In some instances, lacking complete access to your medical records or information may lead to adverse drug</div>
<div style="margin-bottom: 8px; font-weight: 500;">interactions, allergic reactions, or other judgment errors. You acknowledge and agree that if such an event occurs due</div>
<div style="margin-bottom: 8px; font-weight: 500;">to your failure to provide necessary information or medical history, the healthcare service provider will not be held</div>
<div style="margin-bottom: 8px; font-weight: 500;">liable. Additionally, CureBharat  is not liable for consultations conducted on behalf of the healthcare service provider.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You understand that the diagnosis and treatment plan determined during the teleconsultation could change based on</div>
<div style="margin-bottom: 8px; font-weight: 500;">your condition, and you should see a medical professional in person if your clinical situation worsens.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You also acknowledge the inherent risks involved in receiving medical services via mobile or computer platforms,</div>
<div style="margin-bottom: 8px; font-weight: 500;">which include:</div>
<div style="margin-bottom: 8px; font-weight: 500;">i. Information transmitted may be insufficient (e.g., poor image resolution) for the healthcare service provider to make</div>
<div style="margin-bottom: 8px; font-weight: 500;">appropriate decisions.</div>
<div style="margin-bottom: 8px; font-weight: 500;">ii. Your healthcare service provider may be unable to provide medical treatment or arrange care for emergencies.</div>
<div style="margin-bottom: 8px; font-weight: 500;">iii. You agree not to rely on any other service provider you are or may be engaging with during events of emergency.</div>
<div style="margin-bottom: 8px; font-weight: 500;">In such cases, you must make your own arrangements for treatment and bear the costs.</div>
<div style="margin-bottom: 8px; font-weight: 500;">iv. Delays in medical evaluation and treatment may occur due to deficiencies or failures of the application or website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">v. Security protocols may fail, potentially compromising your confidential medical information.</div>
<div style="margin-bottom: 8px; font-weight: 500;">vi. Incomplete access to medical records can lead to errors in medical judgment.</div>
<div style="margin-bottom: 8px; font-weight: 500;">While users may expect benefits from CureBharat , HSPs, and their representatives, no results are guaranteed. Your</div>
<div style="margin-bottom: 8px; font-weight: 500;">condition may not improve and could worsen.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  does not guarantee outcomes from Teleconsultations and is not responsible for medical emergencies or</div>
<div style="margin-bottom: 8px; font-weight: 500;">related expenses unless negligence or gross misconduct is proven.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You have certain rights regarding Teleconsultation:</div>
<div style="margin-bottom: 8px; font-weight: 500;">You retain the right to withhold or withdraw consent at any time, without impacting your access to future care or</div>
<div style="margin-bottom: 8px; font-weight: 500;">treatment. The laws safeguarding the confidentiality of your medical information remain applicable to this</div>
<div style="margin-bottom: 8px; font-weight: 500;">Teleconsultation; however, these protections do not extend to the preliminary call.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Furthermore, you acknowledge that any personally identifiable images or information arising from the telemedicine</div>
<div style="margin-bottom: 8px; font-weight: 500;">interaction will not be disseminated to researchers or third parties without your explicit written consent. Non</div>
<div style="margin-bottom: 8px; font-weight: 500;">identifiable data may be shared with external entities such as data aggregators, medical journals, or researchers.</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. No Doctor-Patient Relationship:</div>
`), 
  pageShell(22, `
<div style="margin-bottom: 8px; font-weight: 500;">c. HSP's Services:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  acts as a transaction facilitator for interactions via the Application/Website. It does not advertise HSP</div>
<div style="margin-bottom: 8px; font-weight: 500;">services or their quality. CureBharat  only ensures all HSPs on the platform are legally qualified to provide</div>
<div style="margin-bottom: 8px; font-weight: 500;">professional advice and diagnosis.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You acknowledge that the Services provided by CureBharat  through the Application or Website are each governed by</div>
<div style="margin-bottom: 8px; font-weight: 500;">their own terms and conditions, which are available on the platform, from individual service providers, and from</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat 's customer service representatives. Agreeing to these general Terms and Conditions does not</div>
<div style="margin-bottom: 8px; font-weight: 500;">automatically bind you to those specific terms.</div>
<div style="margin-bottom: 8px; font-weight: 500;">We are not liable, directly or indirectly, for the authenticity of Services provided through the Application or Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. Information About HSP and Services:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Information on HSP and CureBharat  Services is for general reference only and may change or become outdated.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Please independently verify any information regarding an HSP before engaging with them via the Application or</div>
<div style="margin-bottom: 8px; font-weight: 500;">Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">e. Prescription Drugs:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  facilitates the purchase of prescription drugs through its Application or Website, which may be</div>
<div style="margin-bottom: 8px; font-weight: 500;">prescribed by affiliated HSPs or third-party registered medical practitioners. The process for using the prescription</div>
<div style="margin-bottom: 8px; font-weight: 500;">drug dispensary system is outlined below:</div>
<div style="margin-bottom: 8px; font-weight: 500;">To purchase prescription drugs from the Application or Website, you must upload a scanned and clear copy of a valid</div>
<div style="margin-bottom: 8px; font-weight: 500;">prescription to the Application or Website or email it to CureBharat . You should ensure that, whenever possible, your</div>
<div style="margin-bottom: 8px; font-weight: 500;">HSP prescribes drugs using generic or trade names; if your uploaded prescription does not meet these criteria, you</div>
<div style="margin-bottom: 8px; font-weight: 500;">will need to inform your HSP and resolve the issue.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Orders will not be processed by CureBharat  until a valid prescription has been received. The HSP will verify the</div>
<div style="margin-bottom: 8px; font-weight: 500;">prescription you provide, and if any discrepancies are found, your order will be canceled immediately. You may also</div>
<div style="margin-bottom: 8px; font-weight: 500;">be required to present the original prescription when you receive your prescription drugs.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You acknowledge that without the above, CureBharat  will not provide a substitute drug for the prescribed</div>
<div style="margin-bottom: 8px; font-weight: 500;">medication.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CUREBHARAT  MAKES NO GUARANTEES REGARDING THE SECURITY, RELIABILITY, QUALITY, TIMELINESS, OR</div>
<div style="margin-bottom: 8px; font-weight: 500;">PERFORMANCE OF: (I) THE APPLICATION/WEBSITE AND ITS FEATURES; (II) HSP INFORMATION ON THE</div>
<div style="margin-bottom: 8px; font-weight: 500;">APPLICATION/WEBSITE; (III) ANY SERVICE INFORMATION, CONTENT, OR ADVICE OBTAINED THROUGH THE</div>
<div style="margin-bottom: 8px; font-weight: 500;">APPLICATION/WEBSITE; (IV) ACCESS TO OR ALTERATION.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  is not responsible for any content you or a healthcare service provider (HSP) post on the application or</div>
<div style="margin-bottom: 8px; font-weight: 500;">website; you are solely responsible for your own user content.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">2. One Circle Health Plan:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Group Health Insurance Policy:</div>
<div style="margin-bottom: 8px; font-weight: 500;">The services available to you through the application/website are part of a group health insurance policy ("Health</div>
<div style="margin-bottom: 8px; font-weight: 500;">Plan") offered by CureBharat  in partnership with an IRDAI-approved insurance company. The Health Plan gives you</div>
<div style="margin-bottom: 8px; font-weight: 500;">access to various services and facilities, but CureBharat  is not itself an insurance company.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Wellness Services:</div>
<div style="margin-bottom: 8px; font-weight: 500;">As a Health Plan member, you and your beneficiaries can access certain wellness services within one year of starting</div>
`), 
  pageShell(23, `
<div style="margin-bottom: 8px; font-weight: 500;">the plan. These include:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Consultations: Free physical or remote appointments with general practitioners or specialists, limited to a</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">specified number per year.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Comprehensive Health Check-Up: Annual free full-body check-up and additional tests (such as liver, kidney,</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">lipid profile, diabetes, urine routine), depending on your specific plan.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Coverage:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Yoga Sessions: Enjoy free solo or group yoga sessions for the Health Plan's duration.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Counselling: Access a set number of counselling sessions based on your needs during the Health Plan</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">period.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Nutritional Specialist: Get health coach/nutrition specialist services at 50% off, as required.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Laboratory and Diagnostics: Receive 50% discount on prescribed tests at CureBharat  network facilities;</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">prescriptions from outside physicians are accepted.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Medication: Buy medication on the CureBharat  App/Website at a 50% discount with any valid prescription.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Home-Care Services: If recommended by a physician, get home-care services (including physiotherapy,</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">nursing, and living assistance) at a 20% discount.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Physical OPD Services: If prescribed, you can attend OPD consultations with CureBharat  network providers at a 15%</div>
<div style="margin-bottom: 8px; font-weight: 500;">discount. Non-network consultations may be reimbursed up to a set amount.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Terms for Wellness Services:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Services are not immediately available upon enrolment and depend on the Health Plan tier you choose. Benefits may</div>
<div style="margin-bottom: 8px; font-weight: 500;">vary according to your selection. If you cannot access specific wellness services mentioned above or elsewhere in</div>
<div style="margin-bottom: 8px; font-weight: 500;">these Terms and Conditions, you may not request unlisted services.</div>
<div style="margin-bottom: 8px; font-weight: 500;">The services listed above, even if covered under any other general insurance policy maintained or offered by</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  or an IRDAI-approved insurance company partnering in servicing the plan, are subject to these terms.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You further acknowledge that you have been adequately informed that the Wellness Services available to you under</div>
<div style="margin-bottom: 8px; font-weight: 500;">the Health Plan must be utilised within one (1) year from the date of commencement of your enrolment in the Health</div>
<div style="margin-bottom: 8px; font-weight: 500;">Plan. It is understood that, upon completion of the Health Plan, any policy renewal shall be at the sole discretion of</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat . The features or components included in your current plan may or may not be offered upon renewal.</div>
<div style="margin-bottom: 8px; font-weight: 500;">These Terms and Conditions provide a comprehensive description of the requirements governing access to and</div>
<div style="margin-bottom: 8px; font-weight: 500;">utilisation of each Wellness Service referenced above. Please note that these services are regulated by separate</div>
<div style="margin-bottom: 8px; font-weight: 500;">agreements and consent forms, which will require your explicit acknowledgement and consent. Your agreement to</div>
<div style="margin-bottom: 8px; font-weight: 500;">these Terms and Conditions does not constitute sufficient acceptance of the specific terms relating to individual</div>
<div style="margin-bottom: 8px; font-weight: 500;">Wellness Services as provided by CureBharat . We also recommend reviewing the policy documents of our insurance</div>
<div style="margin-bottom: 8px; font-weight: 500;">partners, accessible via their respective websites, for further information.</div>
`), 
  pageShell(24, `
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  reserves the right to deny any medical claims submitted by you as the primary policyholder if it is</div>
<div style="margin-bottom: 8px; font-weight: 500;">determined that you failed to disclose or declare any pre-existing diseases or medical conditions at the time of</div>
<div style="margin-bottom: 8px; font-weight: 500;">enrolling in the Health Plan.</div>
<div style="margin-bottom: 8px; font-weight: 500;">c. Cancellation of Plan:</div>
<div style="margin-bottom: 8px; font-weight: 500;">You may cancel this Health Plan at any time by providing written notice to support@CureBharat.com, should any of</div>
<div style="margin-bottom: 8px; font-weight: 500;">the services specified in the Health Plan remain unutilised.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  retains the right to cancel your plan at its discretion in cases of misrepresentation, non-disclosure of</div>
<div style="margin-bottom: 8px; font-weight: 500;">material facts, or if you commit, or are reasonably believed to have committed, fraud. In such instances, the amount</div>
<div style="margin-bottom: 8px; font-weight: 500;">paid will not be refunded.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Partial cancellation of the Health Plan is not permitted. The Wellness Services cannot be combined with any other</div>
<div style="margin-bottom: 8px; font-weight: 500;">insurance policy.</div>
<div style="margin-bottom: 8px; font-weight: 500;">d. Process for Availing Wellness Services:</div>
<div style="margin-bottom: 8px; font-weight: 500;">The Wellness Services shall be accessed and administered exclusively through the Application or Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You may avail yourself of services such as laboratory tests, prescription medications, physical OPD consultations,</div>
<div style="margin-bottom: 8px; font-weight: 500;">lifestyle management, home care, and general practitioner teleconsultations,</div>
<div style="margin-bottom: 8px; font-weight: 500;">Specialist teleconsultation and comprehensive health check-up services are available through the following steps:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Submit a service request via the designated icon on the Application or Website, or by contacting CureBharat</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Customer Service.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Verify your registered mobile number and policy details.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">A CureBharat  representative will provide you with information regarding the process for availing the service,</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">pricing, and scheduling. You will receive detailed service information and may proceed as instructed.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Process for Customer Onboarding and Initiating Coaching Sessions:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">A CureBharat  customer service representative will contact you within seven days of purchasing the policy to</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">explain the policy components, benefits, and service availment procedures.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Your first annual health check, included in your plan, will be scheduled based on your availability.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Alternatively, you may choose to schedule the health check at a later date.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">If you consent, a CureBharat  laboratory partner will arrange for sample collection required for lab tests.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Upon completion, you will receive digital copies of your test results via email or SMS.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">A health coach will contact you to discuss your test reports and will organize follow-up coaching sessions</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">according to a prescribed schedule.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Home Care Services:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  provides an extensive range of home-based healthcare services accessible through the Application or</div>
<div style="margin-bottom: 8px; font-weight: 500;">Website, either directly or via partners. Your engagement with CureBharat  is governed by the terms outlined below.</div>
`), 
  pageShell(25, `
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Users may select the specific types and scope of services offered on the Application or Website. CureBharat</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">is responsible for ensuring delivery of these services, either directly or through third-party providers.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Once selected, services cannot be modified or expanded in scope. Home-based services will be provided only</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">to individuals identified on the Application or Website, and exclusively at the location and address specified</div>
<div style="margin-bottom: 8px; font-weight: 500;">therein.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Only the individual whose name appears on the test or health service request form is eligible to receive the</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">corresponding service.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Packages assigned at registration are eligible for Services. CureBharat  may refuse Services if it learns someone else</div>
<div style="margin-bottom: 8px; font-weight: 500;">is using them.</div>
<div style="margin-bottom: 8px; font-weight: 500;">When engaging home-based services, you must:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Accept the home-health assistant's services at the scheduled time or within their work hours. If unavailable,</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  can reschedule.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Not instruct the assistant to change or expand their duties beyond what the Application/Website provides.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Not solicit independent services from the assistant during or after your engagement.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">You must avoid threats or requests that could be interpreted as such during or after your engagement with the home</div>
<div style="margin-bottom: 8px; font-weight: 500;">based assistant.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If you're unhappy with service quality or conduct, note it on the Application/Website. You may request a different</div>
<div style="margin-bottom: 8px; font-weight: 500;">home-health assistant once per engagement.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If the beneficiary needs to travel, you are responsible for travel arrangements for both the beneficiary and the</div>
<div style="margin-bottom: 8px; font-weight: 500;">assistant.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  personnel are empowered to act independently in emergencies and can make decisions if you or the</div>
<div style="margin-bottom: 8px; font-weight: 500;">physician cannot be reached.</div>
<div style="margin-bottom: 8px; font-weight: 500;">In urgent cases where consent isn't possible, the home-health assistant's decision will be considered valid.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat 's home care plan includes:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Basic Homecare: Bedside attendant (12-hour shift), nurse (12-hour shift/episodic visits), 24-hour attendant,</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">physiotherapist sessions, doctor home visit (8am–8pm).</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Elder Care: Medical/non-medical packages, health monitoring, accompanying to appointments, errand</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">services, dementia care.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Emergency: Ambulance facilitation, hospitalization help, hospital discharge assistance, comprehensive post</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">discharge services (e.g., nursing, attendants, medical supplies).</div>
<div style="margin-bottom: 8px; font-weight: 500;">Hospitalization Help Services:</div>
<div style="margin-bottom: 8px; font-weight: 500;">For certain care package plans, CureBharat  offers assistance to Users on a best-effort basis, supported by a</div>
<div style="margin-bottom: 8px; font-weight: 500;">helpline, to help during hospitalization needs. This support may involve CureBharat  staff—either in person or over</div>
<div style="margin-bottom: 8px; font-weight: 500;">the phone—assisting with User admissions at partner hospitals. Assistance can also include visiting the patient</div>
<div style="margin-bottom: 8px; font-weight: 500;">during hospital visiting hours on subsequent days, liaising with doctors or hospital staff, and supporting the patient</div>
`), 
  pageShell(26, `
<div style="margin-bottom: 8px; font-weight: 500;">during their transition back home. However, CureBharat  does not accept responsibility if partner hospitals cannot</div>
<div style="margin-bottom: 8px; font-weight: 500;">admit patients due to unavailable beds, fail to provide appropriate treatment as needed, or encounter internal issues</div>
<div style="margin-bottom: 8px; font-weight: 500;">that might affect care. Under this service, CureBharat  is not liable for medical bills, advance payments, or other</div>
<div style="margin-bottom: 8px; font-weight: 500;">expenses. The User is responsible for arranging finances and settling all bills directly with the hospital or any health</div>
<div style="margin-bottom: 8px; font-weight: 500;">provider.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Health Monitoring:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Users with chronic conditions or those recently discharged from the hospital often require ongoing health monitoring.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  can assist by checking vital signs, managing medications, accompanying Users to hospital visits, and</div>
<div style="margin-bottom: 8px; font-weight: 500;">helping them access elder and home care products.</div>
<div style="margin-bottom: 8px; font-weight: 500;">The following disclaimers apply to CureBharat ’s home-health services provided to You or Your beneficiary:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">CureBharat  conducts background checks on all personnel engaged for these services; however, it does not</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">guarantee the nature or conduct of any assistant.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">CureBharat  commits to providing its Services with reasonable diligence, adhering to established</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">professional standards and within the stipulated timeframe, consistently exercising skill and care.</div>
<div style="margin-bottom: 8px; font-weight: 500;">All assistance services are offered on a best-effort basis, particularly when delivered in collaboration with third</div>
<div style="margin-bottom: 8px; font-weight: 500;">parties.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  assumes no liability for lack of action, incompetence, or any failure in Service delivery.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Engagement of home-health assistants is a Service provided as part of Your participation in the One Circle Health</div>
<div style="margin-bottom: 8px; font-weight: 500;">Plan; accordingly, the term and termination of these Services will align with the plan. However, CureBharat  reserves</div>
<div style="margin-bottom: 8px; font-weight: 500;">the right to terminate the engagement of home-health assistants at its discretion.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Lab Test:</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Utilizing the Application / Website entitles You to access Services (subject to completion of the registration process) in</div>
<div style="margin-bottom: 8px; font-weight: 500;">the following manner:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">View available test/health packages offered on the Application / Website and book those suited to Your</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">requirements.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Choose one of the following options: (i) visit any of our testing facilities to provide a sample; or (ii) opt for</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">home service (subject to availability at the nearest facility), wherein CureBharat  will dispatch its</div>
<div style="margin-bottom: 8px; font-weight: 500;">representative(s) to Your home for sample collection.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Following sample collection, You will receive Your order ID and related details via email to Your registered address or</div>
<div style="margin-bottom: 8px; font-weight: 500;">by SMS/WhatsApp on Your registered mobile number.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Once Your test report is ready, a download link will be sent to You by email on Your registered address or by</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">SMS/WhatsApp on Your registered mobile number.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Terms of Lab Tests:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Services are non-transferable; only the individual whose name the test/health package was assigned during booking</div>
<div style="margin-bottom: 8px; font-weight: 500;">may avail of the Services.</div>
<div style="margin-bottom: 8px; font-weight: 500;">To utilize the Services, bookings must be completed at least one day in advance before 5 p.m. on business days. For</div>
`), 
  pageShell(27, `
<div style="margin-bottom: 8px; font-weight: 500;">bookings made after 5 p.m., sample collection will occur on the next business day following the subsequent business</div>
<div style="margin-bottom: 8px; font-weight: 500;">day.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You are required to present a photo identification card and Your Order ID when visiting the testing facility or during</div>
<div style="margin-bottom: 8px; font-weight: 500;">home service.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Strict adherence to all instructions or guidelines provided by CureBharat  on the Application / Website prior to</div>
<div style="margin-bottom: 8px; font-weight: 500;">availing the Services is mandatory.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Providing a sample for the test or health packages:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  reserves the right to modify the nature of Services at its sole discretion, with appropriate notification on</div>
<div style="margin-bottom: 8px; font-weight: 500;">the Application or Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You are responsible for your actions when availing Services through the Application or Website. CureBharat  is not</div>
<div style="margin-bottom: 8px; font-weight: 500;">liable for any consequences arising from such actions.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You confirm and acknowledge that CureBharat  is not liable or responsible for any deficiency in payment for Services</div>
<div style="margin-bottom: 8px; font-weight: 500;">booked via the Application or Website. In the event of insufficient payment from your end, CureBharat  is under no</div>
<div style="margin-bottom: 8px; font-weight: 500;">obligation to provide a test report.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  will not issue refunds for Services already booked through the Application or Website unless an error</div>
<div style="margin-bottom: 8px; font-weight: 500;">occurs during the booking process.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Delivery of Test Reports:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Upon completion of your test reports, you will receive a download link via email sent to your registered email</div>
<div style="margin-bottom: 8px; font-weight: 500;">address, or via SMS, WhatsApp, App, or Website notification on your registered mobile number. If you have requested</div>
<div style="margin-bottom: 8px; font-weight: 500;">physical delivery, reports will be delivered as follows:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">If the sample was provided at the testing facility, you may collect it in person on the date and time specified</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">at the time of sample collection.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">If Home Service was used for sample collection, your test reports will be delivered to your home on the date</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">communicated during sample collection.</div>
<div style="margin-bottom: 8px; font-weight: 500;">The processing time for test reports ranges from 1 to 14 days (excluding Sundays), depending on the nature of the</div>
<div style="margin-bottom: 8px; font-weight: 500;">test or health package, with some tests potentially requiring additional time due to unclear results, force majeure</div>
<div style="margin-bottom: 8px; font-weight: 500;">events, or processing by international agencies. Any supplementary information needed during testing must be</div>
<div style="margin-bottom: 8px; font-weight: 500;">supplied by you within 24 hours of notification to ensure timely results. While efforts will be made to deliver reports</div>
<div style="margin-bottom: 8px; font-weight: 500;">on your preferred date, CureBharat  cannot be held responsible for delays resulting from unforeseen circumstances.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Cancellation and Refund Policy:</div>
<div style="margin-bottom: 8px; font-weight: 500;">If you wish to cancel a booking, you may do so as follows:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">For bookings made before 5 p.m. on a business day for sample collection on the next business day, you can</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">cancel or reschedule to another business day within the next five business days. Either option may be</div>
<div style="margin-bottom: 8px; font-weight: 500;">exercised before 9 p.m. on the day of booking.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">For bookings made after 5 p.m. on a business day for...</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Sample collection will take place on the business day following your booking. You may cancel or reschedule within</div>
<div style="margin-bottom: 8px; font-weight: 500;">the next five business days, as long as you do so before 5 p.m. on the next business day. If you don't act within this</div>
`), 
  pageShell(28, `
<div style="margin-bottom: 8px; font-weight: 500;">timeframe, your right to claim services and any fees paid will be forfeited by CureBharat . If you fail to visit the</div>
<div style="margin-bottom: 8px; font-weight: 500;">testing facility or provide a sample during home service on the scheduled date, your rights and fees will also be</div>
<div style="margin-bottom: 8px; font-weight: 500;">forfeited.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If you cancel within the specified period, you’ll be refunded within 7–10 working days, minus a 2.5% cancellation</div>
<div style="margin-bottom: 8px; font-weight: 500;">charge deducted from the total invoice amount. Refunds are processed only to the original payment method.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Elder Care:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Elder care services promote senior health and safety through regular assessments, emergency support, and</div>
<div style="margin-bottom: 8px; font-weight: 500;">advanced monitoring devices. Misuse of resources or repeated false alarms may result in restrictions.</div>
<div style="margin-bottom: 8px; font-weight: 500;">a. Health Care Manager (HCM): A healthcare professional assists beneficiaries with health concerns. Depending on</div>
<div style="margin-bottom: 8px; font-weight: 500;">product coverage, services may include:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Monthly health assessments and medical summaries.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Coordination with other providers for comprehensive home or hospital care, which may incur charges</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">depending on your plan.</div>
<div style="margin-bottom: 8px; font-weight: 500;">b. Fall and Health Vitals Monitoring Devices: If covered, CureBharat   offers fall and vitals monitoring via remote</div>
<div style="margin-bottom: 8px; font-weight: 500;">devices (e.g., watch, pendant, AI camera, bedside monitor, health ring).</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">In emergencies, these devices automatically call CureBharat ’s toll-free number or users can trigger an SOS</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">manually.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Emergency event data, including that which initiates response services, may be shared with you or your</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">nominee.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Emergency Response Services: Ambulances can be dispatched via CureBharat ’s emergency helpline or device</div>
<div style="margin-bottom: 8px; font-weight: 500;">triggers (e.g., phone, health watch, fall detection). Dispatch is limited to emergencies, contingent upon accurate</div>
<div style="margin-bottom: 8px; font-weight: 500;">location and prior address information. Misuse, such as false alarms, may restrict access.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Potential Risks and Compliance Measures:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat   does not guarantee specific outcomes from provided benefits and acknowledges inherent risks.</div>
<div style="margin-bottom: 8px; font-weight: 500;">A. Emergency Response Service:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Availability depends on the beneficiary's geographic location and current demand.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Additional charges beyond plan coverage may apply; CureBharat   may change conditions of availability as</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">needed.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Ambulance type (Advanced or Basic Life Support) is determined by clinical severity.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Unless specified, ambulance services are only for emergency situations affecting the primary subscriber.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Non-emergency usage may incur charges.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Ambulance travel from the emergency site to the hospital counts as one visit; subsequent transfers may be</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">charged per plan terms.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Coverage includes up to a 20 km radius from the subscriber’s primary address noted during plan purchase.</span></div>
`), 
  pageShell(29, `
<div style="margin-bottom: 8px; font-weight: 500;">Requests for service outside the coverage area will be handled on a best-effort basis and may incur charges.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Fall and Health Vitals Monitoring Devices: The health vitals monitoring device is essential for delivering Emergency</div>
<div style="margin-bottom: 8px; font-weight: 500;">Response Services, determining the beneficiary's location, and dispatching an ambulance. If the device is lost, the</div>
<div style="margin-bottom: 8px; font-weight: 500;">beneficiary understands that CureBharat   or its service providers may have difficulty locating and sending an</div>
<div style="margin-bottom: 8px; font-weight: 500;">ambulance during an emergency. Therefore, the beneficiary is solely responsible for safeguarding and caring for the</div>
<div style="margin-bottom: 8px; font-weight: 500;">provided health vitals monitoring devices.</div>
<div style="margin-bottom: 8px; font-weight: 500;">If the device is damaged or lost due to negligence, misuse, or accident, you will be responsible for the replacement</div>
<div style="margin-bottom: 8px; font-weight: 500;">costs. Depending on availability and urgency, CureBharat   may offer replacement options at a discounted rate or at</div>
<div style="margin-bottom: 8px; font-weight: 500;">the current market price of the device.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Users must regularly charge their devices to ensure uninterrupted service. A fully charged device is crucial</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">for proper functioning.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">If your device has this feature, users are responsible for purchasing and maintaining an active SIM card for</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">fall detection devices. It is your responsibility to procure the SIM card and pay monthly bills for data and</div>
<div style="margin-bottom: 8px; font-weight: 500;">telephony services. CureBharat   is not liable for any failure of emergency triggers if the SIM card is</div>
<div style="margin-bottom: 8px; font-weight: 500;">deactivated due to billing or other issues.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Emergency response toll-free services can be accessed without remote monitoring devices by dialling the toll</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">free helpdesk number directly from a phone. It is recommended to communicate emergencies by calling the</div>
<div style="margin-bottom: 8px; font-weight: 500;">toll-free number, rather than relying solely on the remote monitoring device to trigger a response.</div>
<div style="margin-bottom: 8px; font-weight: 500;">As part of the emergency response, the CureBharat   helpdesk team will try to contact the patient or their relatives</div>
<div style="margin-bottom: 8px; font-weight: 500;">listed in the onboarding form. If neither the patient nor their relatives can be reached, the CureBharat   team will</div>
<div style="margin-bottom: 8px; font-weight: 500;">attempt contact three more times every 15 minutes. After four unsuccessful attempts, the team will notify via email,</div>
<div style="margin-bottom: 8px; font-weight: 500;">WhatsApp, and SMS about the failed emergency response attempt and will close the event trigger without</div>
<div style="margin-bottom: 8px; font-weight: 500;">dispatching an ambulance.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Unless included in your package, an ambulance will only be dispatched once payment is confirmed by</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat . After confirmation, the CureBharat  Emergency Response team will attempt to have an</div>
<div style="margin-bottom: 8px; font-weight: 500;">ambulance reach the patient within 30–60 minutes, subject to local traffic conditions. This turnaround time</div>
<div style="margin-bottom: 8px; font-weight: 500;">may be exceeded under exceptional circumstances beyond our control, such as natural disasters.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Calamities, traffic diversions or restrictions from local authorities, or physical access issues due to accidents may</div>
<div style="margin-bottom: 8px; font-weight: 500;">affect vehicular movement.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Ambulance services are only available in certain pin codes. Check coverage at the CureBharat   website.</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">OTHER TERMS:</div>
<div style="margin-bottom: 8px; font-weight: 500;">Cancellation and Refund Policy:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  will not refund payments if cancellation occurs more than thirty (30) days after payment or if you have</div>
<div style="margin-bottom: 8px; font-weight: 500;">used CureBharat 's services.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Sub-contracting:</div>
`), 
  pageShell(30, `
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  may sub-contract services to third parties as needed but remains primarily responsible to users.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">3. Confidentiality:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  will keep your information confidential and will only disclose it if legally required, providing notice so</div>
<div style="margin-bottom: 8px; font-weight: 500;">you can seek protection. If no response is received, CureBharat  will comply with legal disclosure requirements and</div>
<div style="margin-bottom: 8px; font-weight: 500;">seek confidential treatment for the information.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Limitation of Liability:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  and its affiliates are not liable for any direct or indirect damages related to use or inability to use the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Application/Website or services. CureBharat  does not accept liability for third-party providers’ actions or illegal</div>
<div style="margin-bottom: 8px; font-weight: 500;">activities. You may take action against those providers independently. Records will only be produced if required by</div>
<div style="margin-bottom: 8px; font-weight: 500;">an appropriate authority.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Indemnification:</div>
<div style="margin-bottom: 8px; font-weight: 500;">You agree to indemnify, defend, and hold harmless CureBharat , its representatives, and all related parties from any</div>
<div style="margin-bottom: 8px; font-weight: 500;">losses or liabilities arising from your use of the Application/Website, breach of the Agreement, violation of laws,</div>
<div style="margin-bottom: 8px; font-weight: 500;">negligent or intentional acts, misrepresentation, fraudulent feedback, actions based on CureBharat  content,</div>
<div style="margin-bottom: 8px; font-weight: 500;">intellectual property claims, or unauthorized use of the Application/Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Termination:</div>
<div style="margin-bottom: 8px; font-weight: 500;">The Agreement remains effective while you use the Application/Website. You may terminate your relationship with</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  by giving ninety (90) days written notice at support@CureBharat.com; your account will be inactivated</div>
<div style="margin-bottom: 8px; font-weight: 500;">after checking for pending services. You may need to continue until ongoing services are completed. By sending</div>
<div style="margin-bottom: 8px; font-weight: 500;">notice, you end all wellness services tied to your account. CureBharat  can end its relationship with you after thirty</div>
<div style="margin-bottom: 8px; font-weight: 500;">(30) days' written notice but may refuse service without explanation. Immediate termination may happen if</div>
<div style="margin-bottom: 8px; font-weight: 500;">information is untrue, user is critical, unstable, or deceased, service poses a risk, payment is overdue, cooperation</div>
<div style="margin-bottom: 8px; font-weight: 500;">fails, or resources are insufficient. General Legal Terms and payment terms survive termination.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Modifications:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  can suspend, withdraw, restrict, or change any non-paid version of products or services at any time</div>
<div style="margin-bottom: 8px; font-weight: 500;">without notice. Updates to Terms and Conditions will be sent by email or require acceptance upon login. If you</div>
<div style="margin-bottom: 8px; font-weight: 500;">disagree, stop using the Application/Website and Services. You will be notified of changes to the Application/Website</div>
<div style="margin-bottom: 8px; font-weight: 500;">or Service delivery system.</div>
<div style="margin-bottom: 8px; font-weight: 500;">By continuing to use the Application or Website, you consent to any updates or changes. CureBharat  manages all</div>
<div style="margin-bottom: 8px; font-weight: 500;">modifications or updates to the Application or Website at its sole discretion.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Applicable Law and Dispute Resolution:</div>
<div style="margin-bottom: 8px; font-weight: 500;">These Terms are governed by Indian law. Any disputes will be resolved through arbitration in Mumbai under the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Arbitration and Conciliation Act, 1996. Courts in Mumbai may grant interim relief as needed.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Miscellaneous:</div>
<div style="margin-bottom: 8px; font-weight: 500;">If any part of this Agreement is deemed unenforceable, the remaining provisions will stay valid. All notices must be</div>
<div style="margin-bottom: 8px; font-weight: 500;">written in English and sent by email or courier to the addresses specified by each party. Waivers and consents must</div>
<div style="margin-bottom: 8px; font-weight: 500;">be documented and signed. This Agreement represents the full understanding between the parties and does not</div>
<div style="margin-bottom: 8px; font-weight: 500;">include terms beyond those referenced within it.</div>
`), 
  pageShell(31, `
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  is not responsible for any downtime, delays, or unavailability of the Application or Website due to</div>
<div style="margin-bottom: 8px; font-weight: 500;">circumstances beyond its reasonable control, such as cyber-attacks, natural disasters, government actions, floods,</div>
<div style="margin-bottom: 8px; font-weight: 500;">fires, earthquakes, civil unrest, terrorism, strikes, pandemics, labor issues, internet provider failures, or denial-of</div>
<div style="margin-bottom: 8px; font-weight: 500;">service attacks.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  has the right to display advertisements or publicity materials of its choice, including those from other</div>
<div style="margin-bottom: 8px; font-weight: 500;">parties, for commercial purposes via electronic means on the Application or Website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You may not assign or sub-license your rights, duties, or obligations under this Agreement, either wholly or partially,</div>
<div style="margin-bottom: 8px; font-weight: 500;">to another person or entity without CureBharat 's prior written consent.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You agree to receive communications from CureBharat  by email, phone calls, and SMS regarding your transactions</div>
<div style="margin-bottom: 8px; font-weight: 500;">on our Website. Users must register valid phone numbers and email addresses to facilitate communication.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  may also use your email address to send updates, newsletters, changes to service features, and other</div>
<div style="margin-bottom: 8px; font-weight: 500;">notifications to enhance your experience.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  reserves the right to modify any part of these Terms and Conditions and Privacy Policy at any time</div>
<div style="margin-bottom: 8px; font-weight: 500;">without prior notice.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">10. Grievance Redressal Mechanism:</div>
<div style="margin-bottom: 8px; font-weight: 500;">We have appointed a Grievance Officer to handle concerns or grievances related to the Application, Website, Services,</div>
<div style="margin-bottom: 8px; font-weight: 500;">Healthcare Service Providers (HSPs), payment issues, and queries about your Personal Information as governed by</div>
<div style="margin-bottom: 8px; font-weight: 500;">the Privacy Policy. If you have any grievances, please contact our Grievance Officer at grievance@CureBharat.com.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Our officer will strive to resolve your issues promptly.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat 's registered office is located at 6th floor,Lightbridge,Hiranandani Business Park,Andheri East, Mumbai,</div>
<div style="margin-bottom: 8px; font-weight: 500;">400072</div>
<div style="margin-bottom: 8px; font-weight: 500;">GLOSSARY:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">"Application / Website" refers to www.CureBharat .com and the CureBharat   mobile application.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">"Counsellor" means a qualified counselling or clinical psychologist.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">"Doctor" includes both General Practitioners and Specialists.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">"General Practitioner" is a doctor with an MBBS degree licensed to practice medicine in India.</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">"Healthcare Service Providers" or "HSPs" are third parties such as clinics or hospitals listed on the</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Application or Website, including qualified doctors, nurses, paramedical staff, physiotherapists, consultants,</div>
<div style="margin-bottom: 8px; font-weight: 500;">medical equipment suppliers, laboratory providers, phlebotomists, pharmacists, and other ancillary</div>
<div style="margin-bottom: 8px; font-weight: 500;">healthcare providers who interact with Users as part of the Services.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">"Health check up" is a thorough physical examination involving various tests based on age and sex to</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">ensure good health.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">"HSP Registered Users" are Registered Users whose profiles have unique identifiers, such as a professional</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">registration number, UHID (unique health identification), or UMR (unique medical record). HSP Registered</div>
`), 
  pageShell(32, `
<div style="margin-bottom: 8px; font-weight: 500;">Users may have restricted access to certain areas of the Application or Website.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">"Network Provider" means physicians, hospitals, clinics, diagnostic centres, or other health providers</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">enlisted by CureBharat  to offer medical services to product members.</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">"Non-Registered Users" are users who have not registered on the Application or Website and may have</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">limited access to certain sections.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">10. "Nutritionist" refers to a person specializing in nutrition who helps individuals develop healthy eating habits to</div>
<div style="margin-bottom: 8px; font-weight: 500;">improve health and prevent disease.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">11. "Personal Information" shall have the same meaning as defined in the Privacy Policy.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">12. "Platform" refers to www.CureBharat .com and/or the CureBharat   mobile application, owned and operated by</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  .</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">13. "Registered Users" are those who have successfully registered with CureBharat  through the Application or</div>
<div style="margin-bottom: 8px; font-weight: 500;">Website by providing accurate information, allowing them to log on.</div>
<div style="margin-bottom: 8px; font-weight: 500;">their account on the Application/Website by providing their username and password (“Primary User”), or whose</div>
<div style="margin-bottom: 8px; font-weight: 500;">profile has been successfully created on the Application/Website under the account of a Primary User, by providing</div>
<div style="margin-bottom: 8px; font-weight: 500;">information that is true and accurate (“Secondary User”).</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">14. "Services" refers to the services provided by CureBharat , which include Telemedicine Consultation, Home Health</div>
<div style="margin-bottom: 8px; font-weight: 500;">Services, Laboratory Testing, and the One Circle Health Plan.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">15. "Specialist" denotes a doctor who possesses, at minimum, an M.D., M.S., or equivalent qualification and is</div>
<div style="margin-bottom: 8px; font-weight: 500;">licensed to practice medicine in India.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">16. "Teleconsultation" or "Telemedicine Services" refers to video or phone appointments between You and the HSPs.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">17. "Users"—Registered Users, HSP Registered Users, and Non-Registered Users—shall be individually or collectively</div>
<div style="margin-bottom: 8px; font-weight: 500;">referred to as Users.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">18. "Wellness Services" means the services available to you by CureBharat   on or through the Platform.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">19. "Healthcare Manager (HCM)" is a paramedical healthcare professional who coordinates with patients and plan</div>
<div style="margin-bottom: 8px; font-weight: 500;">subscribers to record and update health parameters. The HCM may also visit the patient's home to capture medical</div>
<div style="margin-bottom: 8px; font-weight: 500;">history and vital signs or collect blood samples for laboratory testing.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">20. "Healthcare Concierge" signifies a healthcare professional who virtually assists in resolving a patient’s healthcare</div>
<div style="margin-bottom: 8px; font-weight: 500;">queries and can facilitate appointment scheduling across the CureBharat  network of care providers. A concierge is</div>
<div style="margin-bottom: 8px; font-weight: 500;">accessible through the CureBharat  Helpdesk toll-free number.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">21. "You" (including its grammatical variations) refers to the individual(s) purchasing the Product, as well as any</div>
<div style="margin-bottom: 8px; font-weight: 500;">family members named as beneficiaries at the time of purchase and permitted under the terms of the Product.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">22. "Product Brochure" includes the Product purchase documents, brochure, and all other documents provided to the</div>
`), 
  pageShell(33, `
<div style="margin-bottom: 8px; font-weight: 500;">Beneficiary upon enrolment, including flyers, inclusions, exclusions, and other terms and conditions.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">23. "Product Coverage" refers to the extent and nature of the bundle of benefits available to the Beneficiary as part of</div>
<div style="margin-bottom: 8px; font-weight: 500;">the Product.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">24. "Physical OPD Consultations" refer to in-person consultations conducted with a Doctor or Specialist at a clinic or</div>
<div style="margin-bottom: 8px; font-weight: 500;">outpatient department of a hospital.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">25. "CureBharat  Wallet Points" are non-cash tokens within the CureBharat   Wallet, which may be exchanged for</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  Benefits or discounts, subject to applicable terms and conditions, in a manner similar to cash.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">26. "Home Care" entails healthcare or supportive care provided by a professional caregiver in the individual's home or</div>
<div style="margin-bottom: 8px; font-weight: 500;">place of residence, as opposed to group accommodations like clinics or nursing homes.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">27. "Product and Product Coverage" refers to the bundle of eldercare services offered by CureBharat   described in</div>
<div style="margin-bottom: 8px; font-weight: 500;">these Terms and Conditions and/or the Product Brochure provided to You.</div>
<div style="margin-bottom: 8px; font-weight: 500;">DISCLAIMER:</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  expressly disclaims any responsibility towards Users regarding development, maintenance, or updating</div>
<div style="margin-bottom: 8px; font-weight: 500;">of the Application/Website. The Application/Website and Services provided by CureBharat  are delivered "as-is," as</div>
<div style="margin-bottom: 8px; font-weight: 500;">available, without any warranties or conditions (express or implied, including but not limited to implied warranties of</div>
<div style="margin-bottom: 8px; font-weight: 500;">merchantability, accuracy, fitness for a particular purpose, title, or non-infringement, whether arising by statute, law,</div>
<div style="margin-bottom: 8px; font-weight: 500;">or from prior dealings or trade).</div>
<div style="margin-bottom: 8px; font-weight: 500;">To the fullest extent permitted by law, CureBharat  disclaims all liability arising from Users’ use of or reliance on the</div>
<div style="margin-bottom: 8px; font-weight: 500;">Application/Website, Services, CureBharat  Content, representations and warranties made by CureBharat , or any</div>
<div style="margin-bottom: 8px; font-weight: 500;">opinion or suggestion expressed by CureBharat  or its contractors and agents (including HSPs).</div>
<div style="margin-bottom: 8px; font-weight: 500;">Specifically, CureBharat  is not liable for:</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Any pre-existing medical condition; or</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Any adverse drug reaction (due to any act or omission based on information found on the</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">Application/Website, or provided to CureBharat  at any stage); or</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Sudden escalation of a prior medical condition or situations resulting from omitted critical or material health</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">information by a User; or</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Any medical emergency during treatment when the underlying cause cannot be directly attributed to</span></div>
<div style="margin-bottom: 8px; font-weight: 500;">negligence or incompetence of the service provider.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  assumes no responsibility and shall not be liable for how Your personal data is used. It is solely Your</div>
<div style="margin-bottom: 8px; font-weight: 500;">responsibility to ensure that Your Personal Information and User Content are managed in compliance with applicable</div>
<div style="margin-bottom: 8px; font-weight: 500;">privacy laws.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  assumes no responsibility for, and shall not be liable for, any damages to or viruses that may infect</div>
<div style="margin-bottom: 8px; font-weight: 500;">User's equipment due to access, use, or browsing of the Application/Website, or downloading any material, data,</div>
<div style="margin-bottom: 8px; font-weight: 500;">text, images, video, or audio content from the Application/Website. If a User is dissatisfied with the</div>
`), 
  pageShell(34, `
<div style="margin-bottom: 8px; font-weight: 500;">Application/Website, the User’s exclusive remedy is to discontinue its use.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Neither CureBharat  nor its contractors and agents (including HSPs) will be held monetarily or otherwise liable in any</div>
<div style="margin-bottom: 8px; font-weight: 500;">incident where no medical or procedural negligence by CureBharat  or its contractors and agents is proven.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Please note, use of the Application/Website or any Services does not include provision of a computer, mobile device,</div>
<div style="margin-bottom: 8px; font-weight: 500;">or other necessary equipment required for access. To utilize the Application/Website, Users must have internet</div>
<div style="margin-bottom: 8px; font-weight: 500;">connectivity and appropriate devices.</div>
<div style="margin-bottom: 8px; font-weight: 500;">Telecommunication links: CureBharat  shall not be responsible or liable for any costs incurred in procuring equipment,</div>
<div style="margin-bottom: 8px; font-weight: 500;">telephones, or any other expenses you may incur in connection with the use of the platform.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  makes no warranty or representation that any errors in the application or website will be corrected</div>
<div style="margin-bottom: 8px; font-weight: 500;">except as required by law.</div>
<div style="margin-bottom: 8px; font-weight: 500;">You acknowledge and agree that the open and real-time nature of the platform makes it impossible for CureBharat  to</div>
<div style="margin-bottom: 8px; font-weight: 500;">guarantee the validity, authenticity, or honesty of user content. CureBharat  is not responsible for any user content on</div>
<div style="margin-bottom: 8px; font-weight: 500;">the application or website, nor for any consequences resulting from reading or relying on such content.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  does not guarantee and shall not be held liable or responsible for any failure to send communications,</div>
<div style="margin-bottom: 8px; font-weight: 500;">notifications, or reminders to you, whether or not such features are part of the application or website.</div>
<div style="margin-bottom: 8px; font-weight: 500;">CureBharat  shall not be responsible or liable for any breach or loss of data, including personal information, caused</div>
<div style="margin-bottom: 8px; font-weight: 500;">by events beyond its control due to technical reasons or third-party actions. ---</div>
<div style="margin-bottom: 8px; font-weight: 500;">Annexure-I: Personal Information Includes</div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">User’s name</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Birth date/age</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Gender</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Address (including country and pin/postal code)</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Location information, including GPS location</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Phone number/mobile number</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Email address</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">Valid financial information at the time of purchase of services and/or online payment</span></div>
<div style="margin-left: 12px; margin-bottom: 6px; display: flex;"><span style="margin-right: 8px;">•</span><span style="flex:1;">CUREBHARAT Login ID and password</span></div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">10. User details provided at the time of registration or thereafter</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">11. Records of interaction with CUREBHARAT’s representatives</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">12. Usage details such as time, frequency, duration, usage patterns, features used, and amount of storage utilized</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">13. Master and transaction data, and other data stored in your user account</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">14. Internet Protocol address, browser type, browser language, referring URL, files accessed, errors generated, time</div>
<div style="margin-bottom: 8px; font-weight: 500;">zone, operating system, and other visitor details collected in log files</div>
`), 
  pageShell(35, `
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">15. User tracking information such as, but not limited to, device ID, Advertising ID, etc.</div>
<div style="font-weight: 700; color: #0B5D2A; margin-top: 16px; margin-bottom: 8px; font-size: 13px;">16. Any other information willingly shared by you</div>
<div style="margin-top: 320px; text-align: center; font-weight: 800; font-size: 18px; color: #0B5D2A;">
  Thank You for choosing CureBharat.
</div>


<img src="https://res.cloudinary.com/dukua47wj/image/upload/v1781334213/6b4c8003-8aef-4cb4-a656-256a84618bae.png" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 450px; opacity: 0.08; z-index: 0; pointer-events: none;" />
<div style="position: absolute; bottom: 90px; left: 45px; right: 45px; font-size: 11px; line-height: 1.6; color: #444; text-align: center; border-top: 1px solid #ccc; padding-top: 20px; background: #fff; z-index: 10;">
  <strong>Company Name:</strong> CUREBHARAT WELLNESS PRIVATE LIMITED<br/>
  <strong>Address:</strong> CureBharat Wellness Private Limited, 6th Floor, Lightbridge, Hiranandani Business Park, Andheri East, Mumbai - 400072<br/>
  <strong>CIN Number:</strong> U86900MH2026PTC467036<br/>
  <strong>GST Number:</strong> 27AANCC5024C1ZX<br/>
  <strong>PAN:</strong> AANCC5024C*<br/>
  <strong>TAN:</strong> MUMC33859A*<br/>
  <strong>UDHYAM:</strong> UDYAM-MH-18-0553626<br/>
  <strong>Contact Us:</strong> +91 22-44512860 | <strong>Email:</strong> contactus@curebharat.com
</div>

`), 
];
