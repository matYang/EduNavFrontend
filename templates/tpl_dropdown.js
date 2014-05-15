<script type="text/template" id="tpl_favoriteDropdown">
  <div class='dropdownContent' data-userId='<%= userId %>'>
    <div class='dropdown-img'>
      <img src='<%= imgPath %>'/>
    </div>
    <div class='dropdown-text dropdown-favorite-text'>
      <div class='dropdown-favorite-text-wrapper'>
        <div class='dropdown-text-row1'>
          <span class='dropdown-text-name'><%= name %></span>
          <span class='dropdown-text-gender'><img src='res/dropdown/gender-<%= gender %>.png' /></span>
        </div>
        <div class='dropdown-text-row2'>
          <span><%= location %></span>
        </div>
      </div>
      <div class='dropdown-text-avgScore'>
        <span><%= averageScore %></span>
      <div>
    </div>
  </div>
</script>


<script type="text/template" id="tpl_letterDropdown">
  <div class='dropdownContent letter-dropdown-read-<%= state %>'  data-letterId='<%= letterId %>'
          <% if (from_user.userId === app.sessionManager.getUserId()) { %>
                  data-userId='<%= to_user.userId %>'
          <% } else { %>
                  data-userId='<%= from_user.userId %>'
          <% } %>
          
          <div class='dropdown-img'>
                  <img src='<%= from_user.imgPath %>'/>
          </div>
          <div class='dropdown-text dropdown-letter-text'>
                  <div class='dropdown-text-row1'>
                          <div class = 'dropdown-letter-from-txt'>
                                  <% if (from_user.userId === app.sessionManager.getUserId()) { %>
                                          <span>你对</span>
                                          <span class='dropdown-text-name'><%= to_user.name %></span>
                                          <span>说：</span>
                                  <% } else { %>
                                          <span class='dropdown-text-name'><%= from_user.name %></span>
                                          <span>对你说：</span>
                                  <% } %>
                          </div>
                          <div class='dropdown-letter-content-text'><%= content %></div>
                  </div>
                  <div class='dropdown-text-row2'>
                          <span><%= send_time %></span>
                  </div>
          </div>
  </div>
</script>

<script type="text/template" id="tpl_notificationDropdown">
  <div class='dropdownContent notification-dropdown-read-<%= state %>' id='notification-dropdown-<%= notificationId %>' data-notificationId='<%= notificationId %>'>
      <div class='dropdown-img' data-initUserId='<%= initUserId %>'>
                  <img src='<%= imgPath %>'/>
      </div>
      <div class='dropdown-text dropdown-notification-text'>
                  <div class='dropdown-text-row1'>
                          <span class='dropdown-text-name'><%= initUserName %></span>
                          <span><%= notificationText %></span>
                  </div>
                  <div class='dropdown-text-row2'>
                          <span><%= creationTime %></span>
                  </div>
      </div>
  </div>
</script>
