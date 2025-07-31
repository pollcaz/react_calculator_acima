class Api::V1::HtmlDocumentsController < ApplicationController
  def data_tables
    file_path = Rails.root.join("app/data/html/ledger.html.base64")
    base64_content = File.read(file_path).strip

    render json: {
      filename: "data_tables.html",
      content_type: "text/html",
      base64: base64_content
    }, status: :ok
  end
end
