<script type="text/template" id="tpl_personalSocial">
	<div id='profilePage_socialTabContent'>
		<div id='profilePage_socialList'>
			<div class='profilePage_header'>人际圈</div>
			<div id='socialListContent'></div>
		</div>
	</div>
</script>


<script type="text/template" id="tpl_personalSocialCard">
	<div class="social_card" id='social_card_<%= userId %>'>
		<div class="social_picture"><img src="<%= imgPath %>" /></div>
		<div class="social_name"><%= name %></div>
		<div class="social_gender_<%= gender %>"></div>
		<div class="social_level">等级<%= level %></div>
		<div class="social_location"><%= location %></div>	
	</div>
</script>


<script type="text/template" id="tpl_personalSimpleUser">
	<div id='userwatch_<%= userId %>' class = 'profilePage_userWatch'>
	    <div id = 'userwatch_profilePicture_<%= userId %>' class = 'profilePage_profilePicture'></div>
	    <div id = 'userwatch_containerInfo_<%= userId %>' class = 'profilePage_containerInfo'>
	        <div class = 'userwatch_name'><%= name %></div>  
	        <div class = 'userwatch_score'><%= averageScore %></div>
	        <div class = 'userwatch_level'><%= level %></div>
	    </div>
	</div>
</script>


<script type="text/template" id="tpl_personalWatch">
	<div id='profilePage_watchTabContent'>
		<div id='profilePage_messageWatch'>
			<div class='profilePage_header'>我关注的消息</div>
			<div id='messageWatchContent'></div>
		</div>
		<div id='profilePage_userWatch'>
			<div class='profilePage_header'>我关注的用户</div>
			<div id='userWatchContent'></div>
		</div>
	</div>
</script>