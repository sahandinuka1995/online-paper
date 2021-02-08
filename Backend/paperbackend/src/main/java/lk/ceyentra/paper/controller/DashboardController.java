package lk.ceyentra.paper.controller;

import lk.ceyentra.paper.dto.DashboardDTO;
import lk.ceyentra.paper.dto.PaperDTO;
import lk.ceyentra.paper.service.DashboardService;
import lk.ceyentra.paper.service.PaperService;
import lk.ceyentra.paper.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@CrossOrigin
public class DashboardController {

    @Autowired
    DashboardService dashboardService;

    @GetMapping(path = "/{topcard}")
    public ResponseEntity getAllPapers() {
        DashboardDTO dashboardDTO = dashboardService.countAll();
        StandardResponse response = new StandardResponse(200, "Success", dashboardDTO);
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
