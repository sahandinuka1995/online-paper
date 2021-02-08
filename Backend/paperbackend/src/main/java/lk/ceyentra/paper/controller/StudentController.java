package lk.ceyentra.paper.controller;

import lk.ceyentra.paper.dto.StudentDTO;
import lk.ceyentra.paper.dto.StudentResultDTO;
import lk.ceyentra.paper.dto.TotalMarksDTO;
import lk.ceyentra.paper.service.StudentService;
import lk.ceyentra.paper.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
@CrossOrigin
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity saveStudent(@RequestBody StudentDTO dto) {
        studentService.saveStudent(dto);
        StandardResponse response = new StandardResponse(200, "Success", null);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllStudents() {
        List<StudentDTO> allStudents = studentService.getAllStudents();
        StandardResponse response = new StandardResponse(200, "Success", allStudents);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping(path = "/{answers}")
    public ResponseEntity saveAnswers(@RequestBody StudentResultDTO dto) {
        studentService.saveStudentResult(dto);
        StandardResponse response = new StandardResponse(200, "Success", null);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping(path = "/{correctanswers}")
    public ResponseEntity getCorrectAnswers(@PathVariable int correctanswers) {
        List<StudentDTO> correctAnswers = studentService.getCorrectAnswers(correctanswers);
        StandardResponse response = new StandardResponse(200, "Success", correctAnswers);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
