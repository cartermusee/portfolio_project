"""picture column in user

Revision ID: 4d17b2e19268
Revises: 497760efe526
Create Date: 2023-11-21 12:35:05.120123

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d17b2e19268'
down_revision = '497760efe526'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_file', sa.String(length=20), nullable=False))
        batch_op.drop_column('profile_img')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_img', sa.VARCHAR(length=20), nullable=True))
        batch_op.drop_column('image_file')

    # ### end Alembic commands ###
