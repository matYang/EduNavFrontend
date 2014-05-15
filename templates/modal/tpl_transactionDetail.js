
<script type="text/template" id="tpl_transactionDetail">
 <div class="pop_content">
  <div class="messageDetail-top clearfix">
      <% if (direction === 0) {%>
          <div class="messageDetail-top-location clearfix back-and-forth">
      <% } else {%>
          <div class="messageDetail-top-location clearfix one-way">
      <% }%>
          <div class="from"><%= departure_location %></div>
          <div class="arrow">往返</div>
          <div class="to"><%= arrival_location %></div>
      </div>
  </div>
  <div class="clearfix line">
      <div class="user fleft">
          <img src="<%= provider.imgPath %>"/>
          <p><%= provider.name %></p>
      </div>
      <div class="messageDetail-upper-info">
          <dl class="departure clearfix">
              <dt>出发时间：</dt>
              <dd><%= departure_time %>&nbsp;&nbsp;&nbsp;&nbsp;<%= departure_timeSlot %> <label>剩余座位：<%= departure_seatsNumber%>个</label></dd>
          </dl>
          <dl class="arrival clearfix">
            <% if ( transactionId === -1 && arrival_seatsNumber &&  arrival_seatsNumber > 0 ) { %>
              <dt>返回时间：</dt>
              <dd><%= arrival_time %>&nbsp;&nbsp;&nbsp;&nbsp;<%= arrival_timeSlot %> <label>剩余座位：<%= arrival_seatsNumber %>个</label></dd>
            <% } else { %>
              <dt>返回时间：</dt>
              <dd>---- <label>剩余座位：----</label></dd>
            <% } %>
          </dl>
          <dl class="price clearfix">
              <dt>单<s></s>价 : </dt>
              <dd class="priceDisplay">
                  <span id="unitPriceValue" class="F_red F_18"></span>元/人
              </dd>
          </dl>
          <dl class="notes clearfix">
              <dt>备<s></s>注：</dt>
              <dd><%= providerNote %></dd> 
          </dl>
            <% if (state === 0 && transactionId !== -1) { %>
              <div class="status booked">
                  <p><span>已预约</span></p>
            <% } else if (state === 1) { %>
              <div class="status booked">
                  <p><span>预约已取消</span></p>
            <% } else if (state === 2) { %>
              <div class="status status1">
                  <p><span>拼车即将开始...</span></p>
                  <div class="F_orange">拼车即将开始，不能取消预约</div>
            <% } else if (state === 3) { %>
              <div class="status booked">
                  <p><span>拼车已完成</span></p>
            <% } else if (state === 4) { %>
              <div class="status booked">
                  <p><span>申诉中</span></p>
            <% } else if ( transactionId === -1 ) {  %>
              <div id="bookedStatus" class="status booked" style="display:none;">
                  <p><span>已预约</span></p>
            <% } %>
              </div>
          <% if (state === 3) { %>
            <dl class="comment clearfix">
              <dt>评<s></s>价：</dt>
              <dd>
                  <div id="providerStar" class="clearfix">
                      <span class="star"></span>
                      <span class="star"></span>
                      <span class="star"></span>
                      <span class="star"></span>
                      <span class="star"></span>
                  </div>
              </dd>
            </dl>
          <% } %>
      </div>
  </div>
  
  <div class="clearfix line">
      <div class="user fleft">
          <img src="<%= customer.imgPath %>"/>
          <p><%= customer.name %></p>
      </div>
      <div class="booker">
      <% if ( transactionId === -1 ) { %>
          <dl class="clearfix">
              <dt>线路类型：</dt>
              <dd>
                  <div id="transaction_direction_select" class="select_item">
                      <input type="text" class="text" value="请选择线路类型">
                      <span></span> 
                      <ul id="transaction_direction_box" style="display:none">
                          <% if ( departure_seatsNumber && arrival_seatsNumber ) { %>
                            <li id="transaction_round">往返</li>
                          <% } %>
                          <% if ( departure_seatsNumber ) { %>
                            <li id="transaction_go">去程</li>
                          <% } %>
                          <% if ( departure_seatsNumber ) { %>
                            <li id="transaction_back">返程</li>
                          <% } %>
                      </ul>                                      
                  </div>
              </dd>
          </dl>
      <% } %>
          <dl class="clearfix">
              <dt>人<s></s>数：</dt>
              <dd>
              <% if (transactionId !== -1) { %>
                <%= departure_seatsBooked %>
              <% } else { %>  
                  <div class="enter_data">
                      <input id="transaction_book_number" type="text" class="text" value="1">
                      <div id="transaction_control">
                          <span class="add"></span>
                          <span class="plus_disabled"></span>
                      </div>
                  </div>
              <% } %>
              </dd>
          </dl>
          <dl class="price clearfix">
              <dt>价<s></s>格：</dt>
              <dd><span id="transaction_totalPrice" class="F_red F_18">150</span>元</dd>
          </dl>
          <dl class="clearfix">
              <dt>备<s></s>注：</dt>
              <dd>
                <% if (transactionId === -1) { %>
                  <textarea id="transaction_userNote">填写补充信息</textarea>  
                <% } else { %>
                  <%= customerNote %>
                <% } %>
              </dd>
          </dl>
          <% if (state === 3) { %>
            <dl class="comment clearfix">
              <dt>评<s></s>价：</dt>
              <dd>
                  <div id="customerStar" class="clearfix">
                      <span class="star"></span>
                      <span class="star"></span>
                      <span class="star"></span>
                      <span class="star"></span>
                      <span class="star"></span>
                  </div>
              </dd>
            </dl>
          <% } %>
      </div>
  </div>
  
  <div class="btns">
      <% if (transactionId === -1) { %>
        <input id = "startButton" class="btn_O" type="button" value="预&nbsp;&nbsp;约">
      <% } else { %>
        <% if (state === 0) { %>
          <input id = "cancelButton" class="btn_R" type="button" value="取&nbsp;&nbsp;消&nbsp;&nbsp;预&nbsp;&nbsp;约">
        <% } else { %>
          <input id = "contactButton" class="btn_B" type="button" value="联 系 他">
        <% } %>
      <% } %>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input id = "closeButton" class="btn_W" type="button" value="取&nbsp;&nbsp;消">
  </div>
  </div>
</script>
