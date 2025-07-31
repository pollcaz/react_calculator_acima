FROM ruby:3.4.4-slim AS base

WORKDIR /app

RUN apt-get update -qq \
  && apt-get install -y --no-install-recommends nodejs build-essential \
  libsqlite3-dev sqlite3 curl libyaml-dev \
  && apt-get upgrade -y \
  && apt-get autoremove -y \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install

COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]