const { markAttendance: markModelAttendance, getAttendanceByUser, getAttendanceByDate } = require('../models/attendance.model');

/**
 * Attendance service: marking, retrieving, business logic (e.g., only 1 mark per day, check triggers)
 */

// PUBLIC_INTERFACE
function markAttendance(userId) {
  /** Mark attendance for today. Allow only one mark per day. */
  const today = new Date().toISOString().split('T')[0];
  if (getAttendanceByDate(userId, today)) {
    throw new Error('Attendance for today already marked');
  }
  const record = {
    userId,
    date: today,
    markedAt: new Date().toISOString()
  };
  markModelAttendance(record);
  return { ...record, success: true };
}

// PUBLIC_INTERFACE
function getUserAttendanceHistory(userId) {
  /** Returns all user attendance records */
  return getAttendanceByUser(userId);
}

module.exports = { markAttendance, getUserAttendanceHistory };
