<div class='container'>
	<div class='search__header'>
	  <h2> Результаты поиска по запросу '<%= name %>': </h2>
	</div>
	<div class="row">
	  <div id='photos' class="col-xs-12"></div>
	  <div class='col-xs-12'>
	    <ul class='pagination'>
	      <% _.each(pagination, function(number) { %>
	        <li id='page-<%= number %>' class='number'> <a href="#"><%= number %></a> </li>
	      <% }) %>
	    </ul>
	  </div>
	</div>
</div>