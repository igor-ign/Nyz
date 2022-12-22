package br.com.nyz.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Post")
@Table(name = "Post", schema = "public")
@EqualsAndHashCode(of = "id") @ToString(of = "id")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @JoinColumn(name = "user")
    @Column(nullable = false)
    public Integer authorId;

    @Column(nullable = false)
    public String authorEmail;

    @Column(nullable = false)
    public String authorName;

    public String authorPicture;

    @Column(nullable = false)
    public String title;

    @Column(nullable = false)
    public String description;

    @Column(nullable = false)
    private String postContent;

    // TODO : Add post date
}
