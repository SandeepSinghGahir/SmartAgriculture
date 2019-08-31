<form method="post" class="form-inline "  >
              
                  <p></p>
                  <div class="login-form md-10" >
                      <div class="main-div md-10">
                          <div align="center" style={{ fontSize: '20px' }}  >New Cluster</div>
                          <div class="panel" align="left">
                          </div>

                          <div><input type="hidden" name="type" value="Traveler" /></div>
                          <div class="form-group">
                              <input  onChange={this.clusterNameChangeHandler} type="text" class="form-control" name="clustername"
                                  placeholder="Cluster  Name" required="true" />
                          </div>

                          <div class="form-group">
                          <select id = "fieldType" class = "form-control " onChange={this.fieldTypeChangeHandler} name = "fieldType" required>
                            <option value="RF">Ranch field</option>
                            <option value="GF">GreenHouse Field</option>
                          </select>
                          </div>

                          <div class="form-group">
                              <input onChange={this.dateChangeHandler} type="date" class="form-control" name="createdDate"
                                  placeholder="date created" required="true" />
                          </div>

                          <div class="form-group">
                          <select id = "status" class = "form-control " onChange={this.statusChangeHandler} name = "status" required>
                            <option value="A">Active</option>
                            <option value="I">Inactive</option>
                            <option value="UM">Under Maintainence </option>
    
                          </select>
                          </div>

                          <div class="form-group">
                              <input  type="text" class="form-control"
                               name="Location" placeholder="location" required="true" />
                          </div>
                          
             
                           
        

                          <button onClick={this.submitClusterData} class="btn btn-primary">Save Cluster</button>
                          <div></div><br></br>  
                          <a href="http://localhost:3000/addNode" >Save and Add new Node</a>
                      </div>
                  </div>
              
          </form>
