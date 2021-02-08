package lk.ceyentra.paper.service.impl;

import lk.ceyentra.paper.dto.DashboardDTO;
import lk.ceyentra.paper.repo.PaperRepo;
import lk.ceyentra.paper.repo.StudentRepo;
import lk.ceyentra.paper.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    PaperRepo paperRepo;

    @Autowired
    StudentRepo studentRepo;

    @Override
    public DashboardDTO countAll() {
        long allPapers = paperRepo.count();
        long allStudents = studentRepo.count();
        return new DashboardDTO(allPapers, allStudents);
    }
}
