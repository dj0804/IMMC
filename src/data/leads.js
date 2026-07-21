const iso = (d) => d.toISOString().slice(0, 10)
const daysAgo = (n) => iso(new Date(Date.now() - n * 864e5))

export const LEAD_STATUSES = ['New', 'Contacted', 'Trial Booked', 'Converted', 'Lost']

export const leads = [
  { id: 'ld1', name: 'Ajay Subramanian', phone: '+91 98401 30001', source: 'Instagram', interest: 'quarterly', status: 'New', notes: 'Asked about student rate.', createdAt: daysAgo(1) },
  { id: 'ld2', name: 'Nandhini Selvi', phone: '+91 98401 30002', source: 'Walk-in', interest: 'monthly', status: 'Trial Booked', notes: 'Coming Saturday morning for the ₹300 trial.', createdAt: daysAgo(2) },
  { id: 'ld3', name: 'Bharath Kumar', phone: '+91 98401 30003', source: 'Website', interest: 'annual', status: 'Contacted', notes: 'Wants to compare annual vs half-yearly.', createdAt: daysAgo(3) },
  { id: 'ld4', name: 'Shruthi Varma', phone: '+91 98401 30004', source: 'Referral', interest: 'quarterly', status: 'New', notes: 'Referred by Meera Sundaram.', createdAt: daysAgo(3) },
  { id: 'ld5', name: 'Mohan Das', phone: '+91 98401 30005', source: 'Instagram', interest: 'monthly', status: 'Lost', notes: 'Went with a cheaper gym near Katpadi.', createdAt: daysAgo(12) },
  { id: 'ld6', name: 'Keerthana R', phone: '+91 98401 30006', source: 'Website', interest: 'half-yearly', status: 'Converted', notes: 'Registered — now member IMMC-25-0023.', createdAt: daysAgo(20) },
  { id: 'ld7', name: 'Siddharth Iyer', phone: '+91 98401 30007', source: 'Walk-in', interest: 'trial', status: 'Trial Booked', notes: 'VIT student, asked about PT add-on.', createdAt: daysAgo(4) },
  { id: 'ld8', name: 'Preethi Ganesan', phone: '+91 98401 30008', source: 'Referral', interest: 'monthly', status: 'Contacted', notes: 'Post-injury, wants to speak with Divya first.', createdAt: daysAgo(6) },
  { id: 'ld9', name: 'Vikram Rao', phone: '+91 98401 30009', source: 'Instagram', interest: 'annual', status: 'New', notes: 'DM enquiry about timings.', createdAt: daysAgo(1) },
  { id: 'ld10', name: 'Anitha Murugan', phone: '+91 98401 30010', source: 'Website', interest: 'quarterly', status: 'Contacted', notes: 'Wants a tour before committing.', createdAt: daysAgo(8) },
  { id: 'ld11', name: 'Jayakumar S', phone: '+91 98401 30011', source: 'Walk-in', interest: 'monthly', status: 'New', notes: 'Works nearby, asked about 6AM slot crowding.', createdAt: daysAgo(2) },
  { id: 'ld12', name: 'Revathi Krishnan', phone: '+91 98401 30012', source: 'Referral', interest: 'half-yearly', status: 'Trial Booked', notes: 'Bringing a friend to the trial session.', createdAt: daysAgo(5) },
]

export const LEAD_SOURCES = ['Website', 'Instagram', 'Walk-in', 'Referral']
