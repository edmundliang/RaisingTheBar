/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package darkpurple.hw2.database;

import darkpurple.hw2.database.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author edmundliang
 */
public interface ForgotPasswordTokenRepository extends MongoRepository<PasswordResetToken, String> {

    PasswordResetToken findByForgotPasswordToken(String forgotPasswordToken);

}
