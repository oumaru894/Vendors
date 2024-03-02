"""empty message

Revision ID: dbfae3c9cd4f
Revises: 67672e7c2987
Create Date: 2024-02-29 16:32:48.283097

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dbfae3c9cd4f'
down_revision = '67672e7c2987'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_type', sa.String(length=50), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_column('user_type')

    # ### end Alembic commands ###