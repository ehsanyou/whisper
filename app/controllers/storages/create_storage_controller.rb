class CreateStorageController < ApplicationController

  before_start :authorized?

  def main
    
    create_storage = CreateStorage.new

    create_storage.subscribe(CreateColumnFamily)

    create_storage.on(:create_storage_successful) do |storage|

      app.status 201
      return app.json storage.as_json

    end

    create_storage.on(:create_storage_failed) do |storage|

      app.status 400
      return app.json validation_error: storage.errors.to_h

    end

    create_storage.execute(create_storage_params)

  end

  private

  def create_storage_params
    app.params[:email] = current_user.email
    app.params
  end

end