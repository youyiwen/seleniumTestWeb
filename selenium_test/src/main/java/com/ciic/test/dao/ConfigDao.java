package com.ciic.test.dao;

import com.ciic.test.bean.Datasource;
import com.ciic.test.service.ConfigService;
import com.ciic.test.tools.mycode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lixuecheng on 2017/8/1.
 */
@Service
public class ConfigDao implements ConfigService {

    @Autowired
   private JdbcTemplate jdbcTemplate;

    @Override
    public int addDataspource(String name, String des, String type, String link,String dataname, String user,String pass, String tid) {
        return jdbcTemplate.update("INSERT INTO \"datasource\" (\"name\", \"des\", \"type\", \"link\", \"pass\", \"tid\", \"user\", \"dataname\") VALUES (?,?,?,?,?,?,?,?)", mycode.prase(new Object[]{name,des,type,link,pass,tid,user,dataname}));
    }

    @Override
    public int updateDatasource(String id, String name, String des, String type, String link,String dataname,String user, String pass) {
        return jdbcTemplate.update("UPDATE \"datasource\" SET  \"name\"=?, \"des\"=?, \"type\"=?, \"link\"=?, \"pass\"=?, \"user\"=?, \"dataname\"=?  WHERE (\"id\" =?)",mycode.prase(new Object[]{name,des,type,link,pass,user,dataname,id}));
    }

    @Override
    public int removeDatasource(String did) {
        return jdbcTemplate.update("update datasource set isused=0 where id=?",mycode.prase(new Object[]{did}));
    }

    @Override
    public List<Datasource> getDatasource(String tid) {
        return jdbcTemplate.query("select * from datasource where tid=? and isused=1",mycode.prase(new Object[]{tid}),new BeanPropertyRowMapper<Datasource>(Datasource.class));
    }

    @Override
    public String connectDatasource(String did) {
        List<Datasource> ld=  jdbcTemplate.query("select * from datasource where id=?",mycode.prase(new Object[]{did}),new BeanPropertyRowMapper<Datasource>(Datasource.class));
        if(ld.size()==1){
            ConnectDatasource connectDatasource=   new ConnectDatasource(ld.get(0).getLink(),ld.get(0).getDataname(),ld.get(0).getUser(),ld.get(0).getPass(),ld.get(0).getType());
            connectDatasource.Connection();
            return connectDatasource.getConnectRes();

        }else {
            return "无此数据库";
        }

    }

    @Override
    public int clearisused() {
       int a= jdbcTemplate.update("DELETE from caselist where isused=0");
       int b= jdbcTemplate.update("DELETE from datasource where isused=0");
       int c= jdbcTemplate.update("DELETE from element where isused=0");
       int d= jdbcTemplate.update("DELETE from page where isused=0");
       int e= jdbcTemplate.update("DELETE from step where isused=0");

        return a+b+c+d+e;
    }
}
