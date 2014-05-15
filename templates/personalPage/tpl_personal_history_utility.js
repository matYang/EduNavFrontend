<script type="text/template" id="tpl_personalHistory">
	<div id='profilePage_historyTabContent'>
		<div id='profilePage_transactionHistories'>
			<div class='profilePage_header'>交易历史</div>
			<div id='transactionHistoryContent'></div>
		</div>
		<div id='profilePage_notificationHistories'>
			<div class='profilePage_header'>提示历史</div>
			<div id='notificationHistoryContent'></div>
		</div>
	</div>
</script>


<script type="text/template" id="tpl_personalNotificationHistory">
	<div id='personal_notification_<%= notificationId %>' class = 'personal_notification_message'>
		<div class="personal_notification_userDp" data-initUserId='<%= initUserId %>'>
	        <img src='<%= imgPath %>'/>
	    </div><%= initUser.name %><span class="actionText"><%= notificationText %></span>
	    <div class="notification_time"><%= creationTime %></div>
	</div>
</script>


<script type="text/template" id="tpl_personalTransactionHistory">
	<div id='personal_transactionHistory_<%= transactionId %>' class = 'personal_transactionHistory_message'>
	    <div id = 'personal_transactionHistory_state_<%= transactionId %>' class = 'personal_transactionHistory_state transactionState<%= state %>'><%= stateText %></div>
	    <div id = 'personal_transactionHistory_containerInfo_<%= transactionId %>' class= 
	    'personal_transactionHistory_containerInfo'>
	    	<%= departure_time %> <%=departure_timeSlot %> 从<%= departure_location %>到<%= arrival_location %>
	    </div>
	</div>
</script>



<script type="text/template" id="tpl_personalUtility">
	<div id='profilePage_utilityTabContent'>
		<div id='utilitySelect'>
			<h3>账号设置</h3>
			<div class='utilityTab' id="basicInfo">基本资料</div>
			<div class='utilityTab' id="changeDp">修改头像</div>
			<div class='utilityTab' id="passwordInfo">修改密码</div>
			<div class='utilityTab' id="tradeInfo">交易信息</div>
		</div>
		<div id='utility_personalInfo'>
			<div id="utility_name">
				<div class='label'>
				<div class='mandatoryStar'>*</div>
				名字</div>
				<input type='text' name='name' />
				
			</div>
	<!-- 		<div id="utility_nickname">
				<div class='label'>昵称</div>
				<input type='text' name='nickname' />
			</div> -->
			<div id="utility_gender">
				<div class='label'>性别</div>
				<input type='radio' name='gender' value = '0'/><label>男</label>
				<input type='radio' name='gender' value = '1'/><label>女</label>
			</div>
			<div id="utility_birthday">
				<div class='label'>
				<div class='mandatoryStar'>*</div>生日</div>
				<input type='text' name='birthyear' />
				<label>年</label>
				<input type='text' name='birthmonth' />
				<label>月</label>
				<input type='text' name='birthday' />
				<label>日</label>
			</div>
			<div id="utility_phone">
				<div class='label'>
				<div class='mandatoryStar'>*</div>电话</div>
				<input type='text' name='phone' />
			</div>
			<div id="utility_QQ">
				<div class='label'>
				<div class='mandatoryStar'>*</div>QQ</div>
				<input type='text' name='qq' />
			</div>
			<div id="utility_location">
				<div class='label'>
				<div class='mandatoryStar'>*</div>
				位置</div>
				<input type='text' name='location' id='personal_editLocation'/>
			</div>
	<!-- 		<div id="utility_intro">
				<div class='label'>简介</div>
				<textarea type='text' name='intro' ></textarea>
			</div> -->
			<div id="save_personalInfo" class="button">保存</div>
		</div>
		<div id='utility_dp'>
			<form method="post"  action="uploadImg.html" enctype="multipart/form-data" id="uploadform">
		        <input type="file" name="image"/>
		        <input type="submit" value="upload"/>
	        </form>
		</div>
		<div id='utility_password'>
			<div id="oldPassword">
				<div class='label'>
				<div class='mandatoryStar'>*</div>
				原密码</div>
				<input type='password' name='oldPassword' />
			</div>
			<div id="newPassword">
				<div class='label'>
				<div class='mandatoryStar'>*</div>
				新密码</div>
				<input type='password' name='newPassword' />
			</div>
			<div id="confirmNewPassword">
				<div class='label'>
				<div class='mandatoryStar'>*</div>
				确认密码</div>
				<input type='password' name='confirmNewPassword' />
			</div>
			<div id="reset_password" class="button">清空</div>
			<div id="submit_password" class="button">提交</div>
		</div>
		<div id='utility_accountSetting'>
			<div class="utilityBoxContent">
				<div id="notificationMethod">
					<div class='label'>提示方式</div>
					<select name='notificationMethod' id = 'toggleNotificationMethods'>
						<option value="both">phone+email</option>
						<option value="phone">phone only</option>
						<option value="email">email only</option>
					</select>
				</div>
				<div id="paymentMethod">
					<div class='label'>支付方式</div>
					<select name='paymentMethod'>
						<option value="0">线下</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</script>