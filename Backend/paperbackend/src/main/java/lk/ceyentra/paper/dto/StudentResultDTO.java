package lk.ceyentra.paper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentResultDTO {
    private String email;
    private int pid;
    private List<StudentAnswersDTO> answers;
}
