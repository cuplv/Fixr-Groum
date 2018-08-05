FROM ubuntu:16.04

################################################################################
# Install dependencies
################################################################################

# openssh-server, gcc, make, sudo, cmake, apt-transport-https
RUN apt-get update -qq -y \
    && apt-get install -y openssh-server sudo apt-transport-https \
    software-properties-common binutils python python-pip curl wget \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install the right version of npm
#RUN apt-get remove nodejs npm nodejs-legacy
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN sudo npm cache clean -f
RUN sudo npm install -g npm
RUN sudo npm install -g n
RUN sudo n stable

RUN pip install requests

################################################################################
# Set up user
# Run everything in the user space now
################################################################################
RUN mkdir /var/run/sshd
RUN chmod 0755 /var/run/sshd
RUN useradd -m biggroum
RUN groupadd admin
RUN usermod -a -G admin biggroum
RUN sudo chsh -s /bin/bash biggroum

USER biggroum
WORKDIR /home/biggroum

RUN mkdir .ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN git clone https://github.com/cuplv/fixr_groum_search_frontend

RUN cd /home/biggroum/fixr_groum_search_frontend \
    && pip install -r requirements.txt \
    && npm install webpack@1.12.12 \
    && npm install \
    && echo "Compiling web interface..." \
    && npm run build

    # && npm install babel-preset-env \
    # && npm install babel-preset-stage-3 \
    # && npm install babel-loader \
    # && npm install babel-core \

EXPOSE 5000

ENTRYPOINT ["python", \
           "/home/biggroum/fixr_groum_search_frontend/app.py", \
           "--host", "0.0.0.0", \
           "--port", "5000"]
