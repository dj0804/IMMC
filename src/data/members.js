// Seed members. Statuses drive the admin status pills and the dashboard
// "needs attention" list, so the mix here is deliberate: mostly Active, a few
// Expiring within 14 days, some Expired, one Cancelled.

const iso = (d) => d.toISOString().slice(0, 10)
const shift = (days) => iso(new Date(Date.now() + days * 864e5))

// [name, phone, packageId, startOffsetDays, status, ptAddOn, paymentStatus]
const seed = [
  ['Aravind Kumar', '9840012001', 'quarterly', -70, 'Active', true, 'Paid'],
  ['Meera Sundaram', '9840012002', 'annual', -200, 'Active', true, 'Paid'],
  ['Rahul Menon', '9840012003', 'annual', -320, 'Expiring', false, 'Paid'],
  ['Sneha Iyer', '9840012004', 'monthly', -22, 'Expiring', false, 'Paid'],
  ['Vignesh Raja', '9840012005', 'quarterly', -85, 'Expiring', false, 'Pending'],
  ['Deepak Chandran', '9840012006', 'monthly', -12, 'Active', false, 'Paid'],
  ['Anjali Krishnan', '9840012007', 'half-yearly', -95, 'Active', true, 'Paid'],
  ['Suresh Balaji', '9840012008', 'monthly', -45, 'Expired', false, 'Overdue'],
  ['Kavya Lakshmi', '9840012009', 'quarterly', -30, 'Active', false, 'Paid'],
  ['Manoj Pillai', '9840012010', 'annual', -140, 'Active', false, 'Paid'],
  ['Divya Bharathi', '9840012011', 'monthly', -8, 'Active', true, 'Paid'],
  ['Naveen Kumar', '9840012012', 'half-yearly', -170, 'Expiring', false, 'Paid'],
  ['Pooja Ravi', '9840012013', 'quarterly', -55, 'Active', false, 'Paid'],
  ['Sanjay Venkat', '9840012014', 'monthly', -80, 'Expired', false, 'Overdue'],
  ['Lakshmi Priya', '9840012015', 'annual', -60, 'Active', true, 'Paid'],
  ['Ashwin Nair', '9840012016', 'quarterly', -15, 'Active', false, 'Paid'],
  ['Ramya Devi', '9840012017', 'monthly', -5, 'Active', false, 'Pending'],
  ['Gokul Krishna', '9840012018', 'half-yearly', -110, 'Active', false, 'Paid'],
  ['Nithya Sekar', '9840012019', 'monthly', -35, 'Expired', false, 'Overdue'],
  ['Praveen Kumar', '9840012020', 'annual', -250, 'Active', true, 'Paid'],
  ['Harini Mohan', '9840012021', 'quarterly', -40, 'Active', false, 'Paid'],
  ['Vishal Anand', '9840012022', 'monthly', -18, 'Active', false, 'Paid'],
  ['Swetha Raman', '9840012023', 'half-yearly', -20, 'Active', true, 'Paid'],
  ['Karthik Rajan', '9840012024', 'quarterly', -100, 'Cancelled', false, 'Paid'],
]

const DURATIONS = { trial: 0, monthly: 1, quarterly: 3, 'half-yearly': 6, annual: 12 }

export const members = seed.map(
  ([name, phone, packageId, startOffset, status, ptAddOn, paymentStatus], i) => {
    const months = DURATIONS[packageId]
    const start = new Date(Date.now() + startOffset * 864e5)
    const end = new Date(start)
    end.setMonth(end.getMonth() + months)
    return {
      id: `IMMC-25-${String(i + 1).padStart(4, '0')}`,
      name,
      phone: `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`,
      email: `${name.toLowerCase().replace(/[^a-z]/g, '.')}@example.com`,
      packageId,
      durationMonths: months,
      startDate: iso(start),
      endDate: iso(end),
      status,
      ptAddOn,
      healthDeclared: true,
      paymentStatus,
      isStudent: i % 3 === 0,
      joinedVia: i % 4 === 0 ? 'Walk-in' : 'Website',
    }
  }
)

export const MEMBER_STATUSES = ['Active', 'Expiring', 'Expired', 'Cancelled']
export { shift }
