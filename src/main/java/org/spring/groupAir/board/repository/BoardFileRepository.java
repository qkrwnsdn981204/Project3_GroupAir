package org.spring.groupAir.board.repository;

import org.spring.groupAir.board.entity.BoardFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardFileRepository extends JpaRepository<BoardFileEntity,Long> {


  Optional<BoardFileEntity> findByBoardEntityId(Long id);
}
