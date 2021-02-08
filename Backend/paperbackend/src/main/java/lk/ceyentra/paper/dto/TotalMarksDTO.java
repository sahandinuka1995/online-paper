package lk.ceyentra.paper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TotalMarksDTO {
    private long totalquestion;
    private int correctanwers;
}
