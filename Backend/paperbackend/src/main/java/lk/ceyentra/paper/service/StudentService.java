package lk.ceyentra.paper.service;

import lk.ceyentra.paper.dto.StudentDTO;
import lk.ceyentra.paper.dto.StudentResultDTO;
import lk.ceyentra.paper.dto.TotalMarksDTO;

import java.util.List;

public interface StudentService {
    void saveStudent(StudentDTO dto);

    List<StudentDTO> getAllStudents();

    void saveStudentResult(StudentResultDTO dto);

    List<StudentDTO> getCorrectAnswers(int pid);
}
