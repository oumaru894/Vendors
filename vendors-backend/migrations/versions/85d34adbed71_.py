"""empty message

Revision ID: 85d34adbed71
Revises: dbfae3c9cd4f
Create Date: 2024-02-29 21:35:17.313043

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '85d34adbed71'
down_revision = 'dbfae3c9cd4f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_1', sa.String(length=250), nullable=True))
        batch_op.drop_column('imageUrl')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite', schema=None) as batch_op:
        batch_op.add_column(sa.Column('imageUrl', sa.VARCHAR(length=250), nullable=True))
        batch_op.drop_column('image_1')

    # ### end Alembic commands ###
