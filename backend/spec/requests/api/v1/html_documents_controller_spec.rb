require "rails_helper"

RSpec.describe "HTML Documents API", type: :request do
    describe "GET /api/v1/html_documents/data_tables" do
        let(:ledger_html_path) { Rails.root.join("spec/support/data/ledger.html") }
        let(:ledger_html_content) { File.read(ledger_html_path) }

        def normalize_html(html)
            html.gsub(/\s+/, ' ').strip
        end

        it "returns the HTML file as base64 encoded content" do
            get "/api/v1/html_documents/data_tables"

            expect(response).to have_http_status(:ok)

            json = JSON.parse(response.body)

            expect(json).to include(
                "filename" => "data_tables.html",
                "content_type" => "text/html"
            )
            expect(json["base64"]).to be_a(String)

            decoded_html = Base64.decode64(json["base64"])
            expect(normalize_html(decoded_html)).to eq(normalize_html(ledger_html_content))
        end
    end
end
