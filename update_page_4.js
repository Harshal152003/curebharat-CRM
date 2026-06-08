const mongoose = require('mongoose');

const htmlContent = `<div style="
  width:100%;
  min-height:100%;
  padding:28px 34px;
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
  background:#ffffff;
  font-family:Arial,sans-serif;
  color:#334155;
">

  <!-- HEADER -->
  <div style="
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:1.5px solid #E2E8F0;
    padding-bottom:10px;
    margin-bottom:18px;
  ">

    <div style="
      font-size:11px;
      font-weight:700;
      color:#0B5D2A;
      letter-spacing:0.2px;
    ">
      {{plan_name}} - Terms & Conditions
    </div>

    <img
      src="https://www.curebharat.com/Logo.png"
      style="
        height:30px;
        width:auto;
        display:block;
      "
    />

  </div>

  <!-- MAIN TITLE -->
  <div style="
    font-size:20px;
    font-weight:700;
    color:#0B5D2A;
    margin-bottom:10px;
    text-transform:uppercase;
    letter-spacing:0.4px;
  ">
    Terms & Conditions
  </div>

  <!-- SUBTITLE -->
  <div style="
    font-size:11px;
    font-weight:700;
    color:#1E293B;
    margin-bottom:18px;
    border-left:4px solid #F07A1F;
    padding-left:10px;
    line-height:1.5;
  ">
    TERMS & CONDITIONS – PROTECTION PLAN (WITH ANNEXURE)
  </div>

  <!-- CONTENT -->
  <div style="
    flex:1;
    font-size:10.5px;
    line-height:1.75;
    color:#334155;
  ">

    <!-- SECTION -->
    <div style="
      font-size:11px;
      font-weight:700;
      color:#0B5D2A;
      margin-bottom:6px;
    ">
      1. Premium Payment & Policy Validity
    </div>

    <ul style="
      margin:0 0 12px 18px;
      padding:0;
    ">
      <li style="margin-bottom:4px;">
        The policy shall be void ab initio in case of:
      </li>

      <ul style="
        margin:5px 0 6px 18px;
        padding:0;
      ">
        <li style="margin-bottom:3px;">Non-receipt of premium</li>
        <li>Dishonour of cheque / failed transaction</li>
      </ul>

      <li>
        Coverage becomes effective only after premium realization.
      </li>
    </ul>

    <!-- SECTION -->
    <div style="
      font-size:11px;
      font-weight:700;
      color:#0B5D2A;
      margin-bottom:6px;
      margin-top:10px;
    ">
      2. Governing Policy Framework
    </div>

    <ul style="
      margin:0 0 12px 18px;
      padding:0;
    ">
      <li style="margin-bottom:4px;">
        This cover is issued under:
      </li>

      <ul style="
        margin:5px 0 6px 18px;
        padding:0;
      ">
        <li style="margin-bottom:3px;">
          Group Master Policy held by Policyholder
        </li>

        <li>
          Insurer standard terms, exclusions, and conditions
        </li>
      </ul>

      <li>
        In case of dispute:
        <strong style="color:#0B5D2A;">
          Master Policy + Policy Schedule shall prevail
        </strong>
      </li>
    </ul>

    <!-- SECTION -->
    <div style="
      font-size:11px;
      font-weight:700;
      color:#0B5D2A;
      margin-bottom:6px;
      margin-top:10px;
    ">
      3. Disclosure & Misrepresentation
    </div>

    <ul style="
      margin:0 0 12px 18px;
      padding:0;
    ">
      <li style="margin-bottom:4px;">
        Policy is issued based on information provided by the insured/member.
      </li>

      <li>
        Any misstatement, non-disclosure, or fraudulent declaration shall result in:
      </li>

      <ul style="
        margin:5px 0 6px 18px;
        padding:0;
      ">
        <li style="margin-bottom:3px;">Policy cancellation</li>
        <li>Claim repudiation</li>
      </ul>
    </ul>

    <!-- SECTION -->
    <div style="
      font-size:11px;
      font-weight:700;
      color:#0B5D2A;
      margin-bottom:6px;
      margin-top:10px;
    ">
      4. Coverage Scope Limitation
    </div>

    <ul style="
      margin:0 0 12px 18px;
      padding:0;
    ">
      <li style="margin-bottom:4px;">
        Policy wording includes all standard benefits of insurer.
      </li>

      <li>
        Coverage applicable will be restricted to COI / Schedule only.
      </li>
    </ul>

    <!-- SECTION -->
    <div style="
      font-size:11px;
      font-weight:700;
      color:#0B5D2A;
      margin-bottom:6px;
      margin-top:10px;
    ">
      5. Assignment Clause
    </div>

    <ul style="
      margin:0 0 12px 18px;
      padding:0;
    ">
      <li style="margin-bottom:4px;">
        Policy is assigned to Master Policyholder.
      </li>

      <li>
        All claim payouts shall be made to Assignee / Nominee / Legal heir, as applicable.
      </li>
    </ul>

    <!-- SECTION -->
    <div style="
      font-size:11px;
      font-weight:700;
      color:#0B5D2A;
      margin-bottom:6px;
      margin-top:10px;
    ">
      6. Free Look & Cancellation
    </div>

    <ul style="
      margin:0 0 12px 18px;
      padding:0;
    ">
      <li style="margin-bottom:4px;">
        Free Look Period: <strong>15 days</strong> from issuance.
      </li>

      <li>
        Cancellation post Free Look is governed by Master Policy terms.
      </li>
    </ul>

    <!-- SECTION -->
    <div style="
      font-size:11px;
      font-weight:700;
      color:#0B5D2A;
      margin-bottom:6px;
      margin-top:10px;
    ">
      7. Instalment Premium Conditions (If Applicable)
    </div>

    <!-- SUB SECTION -->
    <div style="margin-bottom:10px;">

      <div style="
        font-size:10.5px;
        font-weight:700;
        color:#1E293B;
        margin-bottom:3px;
      ">
        7.1 Grace Period
      </div>

      <ul style="
        margin:0 0 0 18px;
        padding:0;
      ">
        <li>15 days allowed for premium payment.</li>
      </ul>

    </div>

    <!-- SUB SECTION -->
    <div style="margin-bottom:10px;">

      <div style="
        font-size:10.5px;
        font-weight:700;
        color:#1E293B;
        margin-bottom:3px;
      ">
        7.2 Coverage Suspension
      </div>

      <ul style="
        margin:0 0 0 18px;
        padding:0;
      ">
        <li>No coverage during unpaid period post due date.</li>
      </ul>

    </div>

    <!-- SUB SECTION -->
    <div style="margin-bottom:10px;">

      <div style="
        font-size:10.5px;
        font-weight:700;
        color:#1E293B;
        margin-bottom:3px;
      ">
        7.3 Policy Lapse
      </div>

      <ul style="
        margin:0 0 0 18px;
        padding:0;
      ">
        <li style="margin-bottom:3px;">
          Policy cancels if premium not received within grace period.
        </li>

        <li>
          Fresh policy will have new waiting periods.
        </li>
      </ul>

    </div>

    <!-- SUB SECTION -->
    <div style="margin-bottom:10px;">

      <div style="
        font-size:10.5px;
        font-weight:700;
        color:#1E293B;
        margin-bottom:3px;
      ">
        7.4 Claim Adjustment
      </div>

      <ul style="
        margin:0 0 0 18px;
        padding:0;
      ">
        <li style="margin-bottom:3px;">
          Outstanding premium will be deducted from claim
        </li>

        <li>
          Recovered before claim settlement
        </li>
      </ul>

    </div>

    <!-- SUB SECTION -->
    <div style="margin-bottom:0;">

      <div style="
        font-size:10.5px;
        font-weight:700;
        color:#1E293B;
        margin-bottom:3px;
      ">
        7.5 No Refund
      </div>

      <ul style="
        margin:0 0 0 18px;
        padding:0;
      ">
        <li>
          No refund in instalment-based policies upon cancellation.
        </li>
      </ul>

    </div>

  </div>

  <!-- FOOTER -->
  <div style="
    border-top:1.5px solid #E2E8F0;
    margin-top:14px;
    padding-top:8px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:8px;
    color:#64748B;
  ">

    <div>
      CureBharat Wellness Private Limited | www.curebharat.com
    </div>

    <div style="font-weight:700;">
      Page 1
    </div>

  </div>

</div>`;

async function run() {
  await mongoose.connect('mongodb+srv://gaikwadsameer422_db_user:sameer1234@cluster0.smnf6wj.mongodb.net/?appName=Cluster0');
  const db = mongoose.connection.db;

  const templateId = new mongoose.Types.ObjectId("6a2691445f91109462c01999");
  const template = await db.collection('templates').findOne({ _id: templateId });
  
  if (!template) process.exit(1);

  const pages = template.pages;
  
  // Page index 4 is the pointed Terms & Conditions page
  pages[4] = {
    ...pages[4],
    showGlobalHeader: false, // HTML has its own
    showGlobalFooter: false, // HTML has its own
    sections: [
      {
        id: new mongoose.Types.ObjectId().toString(),
        layout: 'full',
        style: { padding: '0px' }, // HTML has its own padding
        components: [
          {
            id: new mongoose.Types.ObjectId().toString(),
            type: 'text',
            props: { content: htmlContent },
            style: { width: '100%', height: '100%' },
            position: { type: 'flow' }
          }
        ]
      }
    ]
  };

  await db.collection('templates').updateOne(
    { _id: templateId },
    { $set: { "pages.4": pages[4] } }
  );

  console.log("Successfully updated page 4 with the new HTML layout");
  process.exit(0);
}
run();
