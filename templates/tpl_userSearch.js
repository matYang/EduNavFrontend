<script type="text/template" id="tpl_userSearch">
  <div id='searchEventTab'>
    <div id = 'searchMain'>
    <div id = 'searchbox' class = 'searchContainer'>
      <div id="inputFields">
          <div id="findUserLocation">
          <div class = "searchInputLabel">地点</div>
          <input type="text" id = 'searchLocationInput_from' class = 'searchInput' />
          <input type="text" id = 'customizeLocationInput_from' class = 'searchInput' />
          </div>
          <div id='findUserName'>
          <div class = "searchInputLabel">名字</div>
          <input type="text" id = 'nameInput' class = 'searchInput' >
          </div>
      </div>
      <div id = 'searchTypeContainer'>
        <div id="all" class="selected button">全部</div>
        <div id="male" class="notSelected button">男</div>
        <div id="female" class="notSelected button">女</div>
      </div>

        <div id = 'searchResultButton' class = 'searchResultButton button'>查询</div>
        
      </div>
      <div id = "leftPanel">
        <div id = 'searchResultDisplayPanel' class = 'searchResultDisplay'>
        <!-- home to the searchResultView on mainPage-->
        </div>
      </div>
    </div>
  </div>
</script>
