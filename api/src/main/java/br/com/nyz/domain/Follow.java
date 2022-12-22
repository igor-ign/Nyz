package br.com.nyz.domain;

import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Follow")
@Table(name = "Follow", schema = "public")
@EqualsAndHashCode(of = "id") @ToString(of = "id")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @JoinColumn(name = "user")
    @Column(nullable = false)
    public Integer followerId;

    @JoinColumn(name = "user")
    @Column(nullable = false)
    public Integer followedId;
}
