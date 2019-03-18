package com.xinhai.dao.usermanager;

import com.xinhai.usermanager.api.User;

import java.util.List;

import org.apache.ibatis.annotations.Param;

/**
 *
 * @author fanxi
 * @date 2016-4-26
 */
public interface UserMapper {
  User getUser(String id);
}
