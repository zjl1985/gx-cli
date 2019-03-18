package com.xinhai.business.usermanager;

import com.xinhai.dao.usermanager.UserMapper;
import com.xinhai.usermanager.api.User;
import com.xinhai.usermanager.api.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author fanxi
 * @date 2016-4-26
 */
@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserMapper userMapper;

  @Override
  public User getUser(String id) {
    return userMapper.getUser(id);
  }
}
