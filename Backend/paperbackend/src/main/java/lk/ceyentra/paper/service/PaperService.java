package lk.ceyentra.paper.service;

import lk.ceyentra.paper.dto.FullPaperDTO;
import lk.ceyentra.paper.dto.PaperDTO;
import lk.ceyentra.paper.dto.StudentDTO;

import java.util.List;

public interface PaperService {
    void savePaper(PaperDTO dto);
    List<PaperDTO> getAllPapers();
    FullPaperDTO getFullPaper(int id);
}
