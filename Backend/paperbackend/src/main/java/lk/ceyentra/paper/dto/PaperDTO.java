package lk.ceyentra.paper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaperDTO {
    private int pid;
    private String name;
    private String duration;
    private int noofq;
}
