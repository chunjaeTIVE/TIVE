package com.tive.repository.users;

import com.tive.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users,Long> , UsersQueryDSL {

    @Override
    <S extends Users> S save(S entity);


    @Query(" select u from Users u where u.email=:email")
    Users findByEmail(String email);
}
