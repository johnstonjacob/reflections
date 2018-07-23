class Reflection {
  constructor(client) {
    this.client = client;
  }

  async getAllReflectionsForEmployee({ employeeID }) {
    const SQL = `SELECT * FROM 
                rs.meetings AS m LEFT JOIN rs.reflections AS r 
                ON m.reflection_id = r.id 
                WHERE m.employee_id = $1;`;
    try {
      const allReflectionsForEmployee = await this.client.query(SQL, [employeeID]);
      return allReflectionsForEmployee;
    } catch (error) {
      throw new Error(error);
    }
  }

  async newReflection({
    employeeID, reflectionText, meetingDate, meetingNotes, respondBy,
  }) {
    const reflectionsSQL = 'INSERT INTO rs.reflections(reflection_text) VALUES ($1) RETURNING id';
    const newMeetingSQL = `INSERT INTO 
                          rs.meetings(meeting_notes, meeting_date, 
                          reflection_id, employee_id, respond_by_date) 
                          VALUES ($1, $2, $3, $4, $5);`;

    try {
      const insertReflectionID = await this.client.query(reflectionsSQL, [reflectionText]);
      const reflectionID = insertReflectionID.rows[0].id;

      await this.client.query(
        newMeetingSQL,
        [meetingNotes, meetingDate, reflectionID, employeeID, respondBy],
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Reflection;