<script type="text/template" id="tpl_personalDetailMessage">
	<div id='profilePage_eventBox_<%= messageId %>' class = 'profilePage_eventBox'>
	    <div id = 'profilePage_profilePicture_<%= messageId %>' class = 'profilePage_profilePicture'>
	        <img src='<%= owner.imgPath %>' />
	    </div>
	    <div id = 'profilePage_containerInfo_<%= messageId %>' class = 'profilePage_containerInfo'>
	    <div class = 'profilePage_departure'>出发地：<%= departure_location %></div>
	    <div class = 'profilePage_arrival'>目的地：<%= arrival_location %></div>
	    <div class = 'profilePage_date'><%= departure_time %></div>
	    <div class = 'profilePage_time'><%= departure_timeSlot %></div>
	    </div>
	    <% if (type === Constants.messageType.help) {%>
	    <div id = 'profilePage_boxContentPrice_<%= messageId %>' class='profilePage_containerPrice'>
	        <div class = 'profilePage_priceUnit'>￥</div>
	        <div class = 'profilePage_price'><%= currentPrice %></div>
	    </div>
	    <% } else { %>
	        <div id = 'profilePage_boxContentPrice_<%= messageId %>' class='profilePage_containerPrice'>
	            <div class = 'profilePage_price'>找车</div>
	        </div>
	    <% } %>
	</div>
</script>


<script type="text/template" id="tpl_personalMessage">
	<div id='profilePage_messageTabContent'>
		<div id='profilePage_messagePublished'>
		<div class='profilePage_header'>我发布的消息</div>
		<div id='profilePage_messagePublishedContent'>
		</div>
		</div>
		<div id='profilePage_messageParticipated'>
		<div class='profilePage_header'>我参与的信息</div>
		<div id='profilePage_messageParticipatedContent'>
		</div>
		</div>
	</div>
</script>


<script type="text/template" id="tpl_personalSimpleMessage">
	<div id='profilePage_eventBox_<%= messageId %>' class = 'profilePage_eventBox'>
	    <div id = 'profilePage_profilePicture_<%= messageId %>' class = 'profilePage_profilePicture'>
	      <img src='<%= owner.imgPath %>' />
	    </div>
	    <div id = 'profilePage_containerInfo_<%= messageId %>' class = 'profilePage_containerInfo'>
	      <div class = 'profilePage_schoolName'><%= location.university %></div>  
	      <div class = 'profilePage_date'><%= simple_date %></div>
	      <div class = 'profilePage_time'><%= simple_timeRange %></div>
	      <div id = 'profilePage_boxContentPrice_<%= messageId %>' class='profilePage_containerPrice'>
	        <div class = 'profilePage_priceUnit'>￥</div>
	        <div class = 'profilePage_price'><%= price %></div>
	      </div>
	    </div>
	</div>
</script>