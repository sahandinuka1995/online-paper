package lk.ceyentra.paper.controller;

import lk.ceyentra.paper.dto.*;
import lk.ceyentra.paper.service.AnswerService;
import lk.ceyentra.paper.service.PaperService;
import lk.ceyentra.paper.service.QuestionService;
import lk.ceyentra.paper.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/paper")
@CrossOrigin
public class PaperController {

    @Autowired
    PaperService paperService;

    @Autowired
    QuestionService questionService;

    @Autowired
    AnswerService answerService;

    @GetMapping
    public ResponseEntity getAllPapers() {
        List<PaperDTO> allPapers = paperService.getAllPapers();
        StandardResponse response = new StandardResponse(200, "Success", allPapers);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping(path = "/{fullpaper}")
    public ResponseEntity getAllPapersWithFullDetails(@PathVariable int fullpaper) {
        FullPaperDTO fullPaper = paperService.getFullPaper(fullpaper);
        StandardResponse response = new StandardResponse(200, "Success", fullPaper);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity savePaper(@RequestBody PaperDTO dto) {
        paperService.savePaper(dto);
        StandardResponse response = new StandardResponse(200, "Success", null);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping(path = "/question")
    public ResponseEntity saveQuestion(@RequestBody QuestionDTO dto) {
        questionService.saveQuestion(dto);
        StandardResponse response = new StandardResponse(200, "Success", null);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping(path = "/answer")
    public ResponseEntity saveAnswer(@RequestBody AnswerDTO[] dto) {
        answerService.saveAnswer(dto);
        StandardResponse response = new StandardResponse(200, "Success", null);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
