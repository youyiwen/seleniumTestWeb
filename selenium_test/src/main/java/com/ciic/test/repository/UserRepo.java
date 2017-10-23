package com.ciic.test.repository;

import com.ciic.test.bean.User;

import com.ciic.test.exception.NotFoundException;
import com.ciic.test.service.UserService;
import com.ciic.test.tools.mycode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lixuecheng on 2017/10/23.
 */
@Service
public class UserRepo implements UserService {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public User getUserByEmail(String email) {
        try {
            return jdbcTemplate.query("select * from user where email=? and isused=1", mycode.getArrayObj(email),new BeanPropertyRowMapper<>(User.class)).get(0);
        } catch (Exception e) {
            throw new NotFoundException("用户","email="+email);
        }
    }

    @Override
    public User getUserById(String id) {
        try {
            return jdbcTemplate.query("select * from user where id=? and isused=1", mycode.getArrayObj(id),new BeanPropertyRowMapper<>(User.class)).get(0);
        } catch (Exception e) {
            throw new NotFoundException("用户","id="+id);
        }
    }



    @Override
    public List<User> getAllUsers() {
        return jdbcTemplate.query("select * from user ",new BeanPropertyRowMapper<>(User.class));
    }

    @Override
    public List<User> addUser(String name, String email, String manage) {
       int a= jdbcTemplate.update("INSERT INTO user ( \"name\", \"email\", \"123456\",  \"ismanager\" ) VALUES ( ?, ?,  ?)",mycode.praseWithArray(name,email,manage));
        if(a>0){
            return getAllUsers();
        }else {
            throw new IllegalArgumentException("添加用户失败");
        }

    }

    @Override
    public List<User> updateUserWithoutPassword(String name, String email, String manage, String id) {
        int a=  jdbcTemplate.update("UPDATE user SET  \"name\"=?, \"email\"=?, \"password\"=\"123456\", \"ismanager\"=?, \"isused\"=1  WHERE (\"id\"=?)",mycode.praseWithArray(name,email,manage,id));
        if(a>0){
            return getAllUsers();
        }else {
            throw new IllegalArgumentException("修改用户失败");
        }
    }

    @Override
    public List<User> deleteUserByid(String id) {
        int a=   jdbcTemplate.update("UPDATE user set isused=0 where id=?",mycode.getArrayObj(id));
        if(a>0){
            return getAllUsers();
        }else {
            throw new IllegalArgumentException("禁用用户失败");
        }
    }
}