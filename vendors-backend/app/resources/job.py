from datetime import datetime, timedelta
import json
from app.model import Job
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from app.schema.job import JobSchema
from flask_restful import Resource

job_schema = JobSchema()

class AddJobResource(Resource):
    '''handle http request from schema'''
    @classmethod
    def post(cls):
        job = job_schema.load(request.get_json()) #converting json from schema to python data
        
        if job.find_by_job_title(job.job_title):
            return{"message": "Job already exist"}
        
        job.save_to_db() #saving to database
        
        return {"message": "Job created successfully "}, 201 #success message
    

class JobView(Resource):
    
    @classmethod
    def get(cls, id: int):
        
        job = Job.query.all()
        
        if job:
            return job
        return {'message','job unavailable'}

        
        

