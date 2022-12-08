package br.com.nyz.domain;

import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user")
@Table(name = "user", schema = "public")
@EqualsAndHashCode(of = "id") @ToString(of = "id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(nullable = false)
    public String name;

    public String profilePicture;

    @Column(nullable = false, unique = true)
    public String email;

    @Column(nullable = false)
    private String password;
}
