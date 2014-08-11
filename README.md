jsDecision
==========

This is a very simple jQuery event decision wrapper.


#Usage

````
      <div id="deleteUser">
         <button data-decision="yes">yes</button>
         <button data-decision="no">no</button>
      </div>
      
      var deleteUser = new decision( '#deleteUser' );

      deleteUser.click().define('yes',function(event){
        alert('yes');
      }).define('no',function(event){
        alert('no');
      });
````
````
      deleteUser.click('data-some-other-attribute').define('yes',function(event){});
````

````
      <select name="car">
         <option value=""></option>
         <option value="honda">Honda</option>
         <option value="lexus">Lexus</option>
      </select>

      var obj = { yell: function(){ alert('ahhh'); } };

      var carSelect = new decision('[name=car]');

      carSelect.change( 'select' ).define('lexus', function(){
        alert('lexus');
        this.yell();
      }, obj);
````

````
      <label> <input type="radio" name="cause" value="support" /> Support </label>
      <label> <input type="radio" name="cause" value="unsupported" /> Unsupported </label>

      var causeRadio = new decision('[name=cause]');

      causeRadio.change( 'radio' ).define('support', function(){
        alert('I support the cause');
      }).define('unsupported', function(){
        alert('I don\'t support the cause');
      });
````
