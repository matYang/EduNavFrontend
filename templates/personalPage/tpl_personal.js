<script type="text/template" id="tpl_personal">
	<div id='profilePage'>
	  <div id='profilePage_dashboard'>
	        <div id='profilePage_profilePicture'>
	          <img src='<%= imgPath %>' />
	        </div>
	        <div id='profilePage_profileOverview'>
	          <div id='profilePage_accountLevel' class = 'profileOverviewBlock'>
	            <div id='profilePage_accountLevelLabel'>等级</div>
	            <div id='profilePage_accountLevelValue'>
	              <%= level %>
	            </div>
	          </div>
	          <div id='profilePage_accountScore' class = 'profileOverviewBlock'>
	            <div id='profilePage_accountScoreLabel'>平均分</div>
	            <div id='profilePage_accountScoreHolder'>
	              <div id='profilePage_accountScoreValue' class = "dashboard_text"><%= averageScore %></div>
	            </div>
	          </div>
	          <div id='profilePage_tradeCount' class = 'profileOverviewBlock'>
	            <div id='profilePage_accountTradeCountLabel'>交易次数</div>
	            <div id='profilePage_accountTradeCountValue' class = "dashboard_text"><%= totalTranscations %></div>
	          </div>
	        </div>
	  </div>
	  <div id='profilePage_accountInfo'>
	    <div id='profilePage_accountInfoHeader'>
	      <div id='profilePage_userName'><%= name %></div>
	      <div id='profilePage_userGender'></div>
	      <div id='profilePage_userAge'><%= age %>岁</div>
	      <% if ( userId !== app.sessionManager.getUserId() ) { %>
	        <div id='profilePage_sendLetter'></div>
	      <% } %>
	    </div>
	    <div id='profilePage_accountInfoContent'>
	      <div id='profilePage_userRealName'>
	        <div class='label'>名字</div>
	        <div class='attributeValue'><%= name %></div>
	      </div>
	      <div id='profilePage_userEmail'>
	        <div class='label'>邮件</div>
	        <div class='attributeValue'><%= email %></div>
	      </div>
	      <div id='profilePage_userCellphone'>
	        <div class='label'>手机</div>
	        <div class='attributeValue'><%= phone %></div>
	      </div>
	      <div id='profilePage_userQQ'>
	        <div class='label'>QQ</div>
	        <div class='attributeValue'><%= qq %></div>
	      </div>
	    </div>
	  </div>
	  <div id='profilePage_tabButton'>
	    <!-- we can use background images for the tabs-->
	<!--     <div id='profilePage_watchTab' class='button tabButton nonSelectedTabButton'>
	      我的关注
	    </div> -->
	    <div id='profilePage_messageTab' class='button tabButton nonSelectedTabButton'>
	      消息记录
	    </div>
	    <div id='profilePage_historyTab' class='button tabButton selectedTabButton'>
	      历史记录
	    </div>
	    <div id='profilePage_socialTab' class='button tabButton  nonSelectedTabButton'>
	      社交
	    </div>
	    <div id='profilePage_utilityTab' class='button tabButton lastTabButton nonSelectedTabButton'>
	      设置
	    </div>
	  </div>
	  <div id='profilePage_content'>
	  </div>
	</div>
</script>