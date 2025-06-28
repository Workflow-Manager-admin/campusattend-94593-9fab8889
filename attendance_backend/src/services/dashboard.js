const { getAttendanceByUser, getAllAttendance } = require('../models/attendance.model');
const { getAllUsers } = require('../models/user.model');

/**
 * Dashboard service: provides summarized statistical overviews.
 */

// PUBLIC_INTERFACE
function getUserOverview(userId) {
  /** Returns overview for current user: total days, percentage, last 5 records */
  const records = getAttendanceByUser(userId);
  const total = records.length;
  const daysThisMonth = new Date().getDate();
  const percentage = daysThisMonth > 0 ? Math.round(100 * total / daysThisMonth) : 0;
  return {
    totalDaysMarked: total,
    percentage,
    lastRecords: records.slice(-5).reverse()
  };
}

// PUBLIC_INTERFACE
function getAttendanceReport() {
  /** Returns a report: for each user, attendance count */
  const users = getAllUsers();
  const attendance = getAllAttendance();
  return users.map(u => {
    const userRecords = attendance.filter(a => a.userId === u.id);
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      totalAttendance: userRecords.length
    };
  });
}

module.exports = { getUserOverview, getAttendanceReport };
