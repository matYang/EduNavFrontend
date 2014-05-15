<script type="text/template" id="tpl_DetailMessage">
        <div class="messageDetail clearfix">
            <!--详细页最顶部， 包括往返位置以及发布时间-->
            <div class="messageDetail-top clearfix">
            <% if (isRoundTrip) {%>
                <div class="messageDetail-top-location clearfix back-and-forth">
            <% } else {%>
                <div class="messageDetail-top-location clearfix one-way">
            <% }%>
                    <div class="from"><%= departure_location %></div>
                    <div class="arrow">往返</div>
                    <div class="to"><%= arrival_location %></div>
                </div>
                
                <div class="messageDetail-top-publishTime">
                    发布时间：<%= creationTime %>
                </div>
            </div>

            <!--司机详细页上部-->
            <div class="messageDetail-upper messageDetail-upper-driver">
                <!--详细信息-->
                <div class="messageDetail-upper-info">

                    <dl class="departure clearfix">
                        <dt>出发时间：</dt>
                        <dd><%= departure_time %>&nbsp;&nbsp;&nbsp;&nbsp;<%= departure_timeSlot %> <label>剩余座位：<%= departure_seatsNumber - departure_seatsBooked %>个</label></dd>
                    </dl>

                    <dl class="arrival clearfix">
                        <dt>返回时间：</dt>
                        <% if (isRoundTrip) {%>
                        <dd><%= arrival_time %>&nbsp;&nbsp;&nbsp;&nbsp;<%= arrival_timeSlot %> <label>剩余座位：<%= arrival_seatsNumber - arrival_seatsBooked %>个</label></dd>
                        <% } else {%>
                        <dd>---- <label>剩余座位：---- </label></dd>
                        <% }%>
                    </dl>

                    <dl class="price clearfix">
                        <dt>单<s></s>价 : </dt>
                        <dd class="priceDisplay">
                            <span class="F_red F_18"><%= departure_priceList[0] %></span>元/人&nbsp;&nbsp;&nbsp;&nbsp;（多人可优惠 <a class="F_blue" href="#">查看详情</a>）
                        </dd>
                        <dd class="priceList">
                           <ul id="pricelist">
                           </ul> 
                        </dd>
                    </dl>

                    <dl class="notes">
                        <dt>备<s></s>注：</dt>
                        <dd><%= note %></dd> 
                    </dl>
                </div>

                <!--发布方的用户信息-->
                <div class="messageDetail-upper-user">
                    <dl class="profile clearfix">
                        <dt><img id='view_profilePicture' src="<%= owner.imgPath %>" width="100px" height="100px" /></dt>
                        <dd>
                            <div class="name"><%= owner.name %></div>
                            <div>评分：<%= owner.averageScore %></div>
                            <div>交易次数：<%= owner.totalTranscations %></div>
                            <div><a id="view_contactLink" class="F_blue" href="#">联系他</a></div>
                        </dd>
                    </dl>
                    <div class="actButton">
                        <% if ( ownerId === app.sessionManager.getUserId() ) { %>
                          <input id="view_end" type="button" class="btn_R_long" value="不再开放" style="margin-top: 5px">
                        <% } else {%>
                          <% if (type === Constants.messageType.help) { %> 
                              <input id="view_book" type="button" class="btn_O_long" value="立即预订"/>
                          <% } else { %> 
                              <input id="view_contact" type="button" class="btn_O_long" value="立即联系"/>
                          <% } %>
                        <% } %>

                    </div>
                </div>
            </div>

            <!--详细页中部-->
            <div class="messageDetail-middle messageDetail-middle-driver">
                <!--自动匹配区域-->
                <div class="messageDetail-middle-autoMatch-container">
                    <div id="view_automatch" class="messageDetail-middle-autoMatch">
                        <div class="messageDetail-middle-autoMatch-title">
                            可能符合您需求的信息
                        </div>
                        <div class="messageDetail-middle-autoMatch-loading">
                             正在为您匹配相应的信息
                        </div>
                    </div>
                </div>

                <!--已有预定区域-->
                <div class="messageDetail-middle-transaction">
                    <div class="messageDetail-middle-transaction-title">
                        该信息已经被<span id="reservation_count" class="F_orange F_16"></span>人预订了
                    </div>
                    <ul id="view_transactions_content"></ul>
                </div>
            </div>

            <!--详细页地图-->
            <div  class="messageDetail-map" >
                <div class="messageDetail-map-title">地图</div>
                <div id="view_map" class="messageDetail-map-content">
                </div>
            </div>
            
        </div>
</script>


<script type="text/template" id="tpl_SimpleMessage">
    <div id = 'searchResultBox_<%= messageId %>' class="message_simple">
        <% if (isRoundTrip)  { %>
            <dl class="clearfix back-and-forth">
        <% } else { %>
            <dl class='clearfix one-way'>
        <% } %>
            <dt><img src="<%= owner.imgPath %>" width="70" height="70"/><p><%= owner.name %></p></dt>
            <dd>
                <div class="from">
                    <h3>出发地：<%= departure_location %></h3>
                    <p><%= departure_time %>  <%= departure_timeSlot %></p>
                    <p>剩余座位：<%= departure_seatsNumber %>个</p>
                </div>
                <div class="arrow"></div>
                <div class="to">
                    <h3>目的地：<%= arrival_location %></h3>
                    <% if (isRoundTrip)  { %>
                    <p>返程时间：<%= arrival_time %>   <%= departure_timeSlot %></p>
                    <p>剩余座位：<%= arrival_seatsNumber %>个</p>
                    <% } else { %>
                    <p>返程时间：-----</p>
                    <p>剩余座位：-----</p>
                    <% } %>
                </div>
                <div class="price"> <%= currentPrice %>元/人 </div>
            </dd>
        </dl>
    </div>
</script>


<script type="text/template" id="tpl_messageCancel">
    <div id="messageEndClose" class="pop_close">关闭</div>
    <div class="pop_content">
        <p>您选择了不再开放，别的用户将无法再看到该信息，也无法再发起新的预约，但是已有预约不会受影响。是否确认？</p> 
        <div class="btns">
            <input id="messageEndConfirm" class="btn_b" type="button" value="确 认"/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input id="messageEndCancel" class="btn_w" type="button" value="取消"/>
        </div>
    </div>
</script>